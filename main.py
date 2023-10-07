import json
from dataclasses import dataclass

from fastapi import FastAPI
import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import dotenv


class DictObj:
    def __init__(self, in_dict: dict):
        assert isinstance(in_dict, dict)
        for key, val in in_dict.items():
            if isinstance(val, (list, tuple)):
               setattr(self, key, [DictObj(x) if isinstance(x, dict) else x for x in val])
            else:
               setattr(self, key, DictObj(val) if isinstance(val, dict) else val)


app = FastAPI()

dotenv.load_dotenv('.env')

token = os.environ.get("INFLUXDB_TOKEN")
org = "my-org"
url = "http://62.109.26.57:8086"

write_client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)


@app.get("/api/get")
async def root(timestamp: str):
    query_api = write_client.query_api()

    query = """from(bucket: "sensors")
     |> range(start: """ + timestamp + """)
     
     """
    tables = query_api.query(query, org="my-org")
    records = []
    for t in tables:
        record = t.records
        record[0].row = None
        my_obj = DictObj(record[0].values)
        records.append(my_obj)

    return records


@app.post("/api/set")
async def say_hello(sensor_id: int, temperature: float, humidity: float):
    write_api = write_client.write_api(write_options=SYNCHRONOUS)
    bucket = "sensors"
    point = (
        Point("temperature_sensor").tag("temperature", temperature).tag("humidity", humidity).field("id", sensor_id)
    )
    return write_api.write(bucket=bucket, org="my-org", record=point)
