import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Chart = ({ data, dataValue }) => {
  const max = Math.max(...data.map(item => item[dataValue]));
  const min = Math.min(...data.map(item => item[dataValue]));

  const yDomain = [Math.floor(min - 0.1 * min), Math.ceil(max + 0.1 * max)];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" /> 
        <YAxis domain={yDomain} /> 
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey={dataValue} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
