import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Customized,
} from 'recharts';

interface Candle {
  hour: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<Candle[]>([]);
  const [city, setCity] = useState<string>('Berlin');

  useEffect(() => {
    fetch(`http://localhost:3001/candles?city=${city}`)
      .then((res) => res.json())
      .then(setData);
  }, [city]);

  const transformedData = data.map((item) => ({
    ...item,
    hourLabel: item.hour.slice(11, 16),
  }));

  const renderCandles = (props: any) => {
    const { xAxisMap, yAxisMap, data, height, width } = props;
    const xAxis = xAxisMap["xAxis"];
    const yAxis = yAxisMap["yAxis"];

    const xBand = xAxis.scale.bandwidth();

    return (
      <g>
        {data.map((entry: any, index: number) => {
          const x = xAxis.scale(entry.hourLabel) + xBand / 2;
          const yOpen = yAxis.scale(entry.open);
          const yClose = yAxis.scale(entry.close);
          const yHigh = yAxis.scale(entry.high);
          const yLow = yAxis.scale(entry.low);

          const color = entry.close > entry.open ? '#4caf50' : '#f44336';

          return (
            <g key={`candle-${index}`}>
              {/* Wick */}
              <line
                x1={x}
                x2={x}
                y1={yHigh}
                y2={yLow}
                stroke={color}
                strokeWidth={2}
              />
              {/* Candle body */}
              <rect
                x={x - 4}
                y={Math.min(yOpen, yClose)}
                width={8}
                height={Math.max(1, Math.abs(yClose - yOpen))}
                fill={color}
              />
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="App">
      <h2>{city} - Hourly Candlestick Chart</h2>
      <select onChange={(e) => setCity(e.target.value)} value={city}>
        <option>Berlin</option>
        <option>NewYork</option>
        <option>Tokyo</option>
        <option>SaoPaulo</option>
        <option>CapeTown</option>
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hourLabel" xAxisId="xAxis" />
          <YAxis yAxisId="yAxis" />
          <Tooltip formatter={(value) => `${value}°C`} />
          <Customized component={renderCandles} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;