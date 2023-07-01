import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import "../CSS/BarChartComp.css"
const BarChartComp = ({ data }) => {
    const randomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red},${green},${blue})`;
      };
      
    let projects = [...new Set(data.flatMap(d => Object.keys(d)))].filter(d => d !== 'day');
    return (
        <div className='barViz'>
            <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {projects.map(project => (
                    <Bar dataKey={project} fill={randomColor()} key={project} />  // You'll need a function to generate random colors or a predefined color palette
                ))}
            </BarChart>
        </div>
    );
};

export default BarChartComp;

