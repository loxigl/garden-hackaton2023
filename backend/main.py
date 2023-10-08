import json
from operator import itemgetter
from dataclasses import dataclass

import uvicorn
from fastapi import FastAPI, status
import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import dotenv
from fastapi.middleware.cors import CORSMiddleware


class DictObj:
    def __init__(self, in_dict: dict):
        assert isinstance(in_dict, dict)
        for key, val in in_dict.items():
            if isinstance(val, (list, tuple)):
                setattr(self, key, [DictObj(x) if isinstance(x, dict) else x for x in val])
            else:
                setattr(self, key, DictObj(val) if isinstance(val, dict) else val)


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"],
                   allow_headers=["*"])
print(os.getcwd())
dotenv.load_dotenv(os.getcwd() + "/.env")
token = os.environ.get("INFLUXDB_TOKEN")
org = "my-org"
url = "http://62.109.26.57:8086"

write_client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)


@app.get("/api/temperature_sensor/humidity")
async def get_humidity(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
         |> range(start: -""" + timestamp + """)
         |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
         """
    tables = query_api.query(query, org="my-org")
    records = []
    result = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    for r in records:
        result += [{'time': r.values["_time"].time().strftime("%H:%M:%S"), "humidity": r.values['humidity']}]
    result = sorted(result, key=itemgetter('time'))
    return result


@app.get("/api/temperature_sensor/temperature_humidity")
async def get_tem_hum(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
             |> range(start: -""" + timestamp + """)
             |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
             |>sort(columns: ["_time"], desc: false)
             """
    tables = query_api.query(query, org="my-org")
    records = []
    result = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    for r in records:
        result += [{'time': r.values["_time"].time().strftime("%H:%M:%S"), "temperature": r.values['temperature'],
                    "humidity": r.values['humidity']}]
    result = sorted(result, key=itemgetter('time'))
    return result


@app.get("/api/temperature_sensor/temperature")
async def get_temperature(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
     |> range(start: -""" + timestamp + """)
     |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
     |>sort(columns: ["_time"], desc: false)
     """
    tables = query_api.query(query, org="my-org")
    records = []
    result = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    for r in records:
        result += [{'time': r.values["_time"].time().strftime("%H:%M:%S"), "temperature": r.values['temperature']}]
    result = sorted(result, key=itemgetter('time'))
    return result


@app.get("/api/temperature_sensor/get")
async def get_all(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
     |> range(start: -""" + timestamp + """)
     |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
     """
    tables = query_api.query(query, org="my-org")
    records = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record

    return records


@app.get("/api/temperature_sensor/average")
async def get_average(timestamp: str):
    query_api = write_client.query_api()

    query = """from(bucket: "sensors")
     |> range(start: -""" + timestamp + """)
     |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
     """
    tables = query_api.query(query, org="my-org")
    records = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    sum_hum = 0
    sum_tem = 0
    count = 0
    for r in records:
        sum_hum += float(r.values["humidity"])
        sum_tem += float(r.values["temperature"])
        count += 1
    result = {"avg_temp": sum_tem / count, "avg_humidity": sum_hum / count}
    return result


@app.get('/api/vibration_sensor/get')
async def get_vibration(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
         |> range(start: -""" + timestamp + """)
         |> filter(fn: (r) => r["_measurement"] == "vibration_sensor")
         """
    tables = query_api.query(query, org="my-org")
    records = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    result = sorted(records, key=itemgetter('time'))
    return result


@app.get('/api/water_sensor/get')
async def get_water(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
     |> range(start: -""" + timestamp + """)
     |> filter(fn: (r) => r["_measurement"] == "water_sensor")
     """
    tables = query_api.query(query, org="my-org")
    records = []
    for t in tables:
        record = t.records
        record[0].row = None
        records += record
    result = sorted(records, key=itemgetter('time'))
    return result


@app.get("/api/get_all")
async def get_all(timestamp: str):
    query_api = write_client.query_api()
    query = """from(bucket: "sensors")
    |> range(start: -""" + timestamp + """)
    |> filter(fn: (r) => r["_measurement"] == "temperature_sensor")
    """
    results = []
    i = 0
    tables = query_api.query(query, org="my-org")
    for t in tables:
        tmp = []
        for r in t.records:
            tmp.append({'table': r.values["table"], 'rows': r.values})
            results += tmp
            i += 1
    return results


org = "my-org"


@app.post("/api/temperature_sensor/set")
async def setter(sensor_id: int, temperature: float, humidity: float):
    write_api = write_client.write_api(write_options=SYNCHRONOUS)
    bucket = "sensors"
    point = (
        Point("temperature_sensor").tag("temperature", temperature).tag("humidity", humidity).field("id", sensor_id)
    )
    try:
        write_api.write(bucket=bucket, org=org, record=point)
        return status.HTTP_200_OK
    except Exception as e:
        return status.HTTP_502_BAD_GATEWAY


@app.post("/api/vibration_sensor/set")
async def vibration_setter(sensor_id: int, statuses: bool):
    write_api = write_client.write_api(write_options=SYNCHRONOUS)
    bucket = "sensors"
    point = Point("vibration_sensor").field('id', sensor_id).tag('status', statuses)
    try:
        write_api.write(bucket=bucket, org=org, record=point)
        return status.HTTP_200_OK
    except Exception as e:
        return status.HTTP_502_BAD_GATEWAY


@app.post("/api/water_sensor/set")
async def water_setter(sensor_id: int, water_level: float):
    write_api = write_client.write_api(write_options=SYNCHRONOUS)
    bucket = 'sensors'
    point = Point('water_sensor').field('id', sensor_id).tag('water_level', water_level)
    try:
        write_api.write(bucket=bucket, org=org, record=point)
        return status.HTTP_200_OK
    except Exception as e:
        return status.HTTP_502_BAD_GATEWAY


if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='192.168.138.64')
