import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
      return { name: genre, value };
    });
    return data;
  };

  useEffect(() => { setData(() => getData()); }, [events]);

  const colors = [
    '#8a2a0a',
    '#234203',
    '#94a474',
    '#c25b3a',
    '#54692f'
  ];

  return (
    <ResponsiveContainer height={400} >
      <PieChart width={400} height400>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          nameKey="name"
          labelLine={false}
          outerRadius={120}
          fill='#8884d8'
          dataKey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' align='center' />
      </PieChart>
    </ResponsiveContainer >
  )
}

export default EventGenre;