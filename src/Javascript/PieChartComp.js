import React from "react";
import "../CSS/PieChartComp.css"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const CustomTooltip = ({ active, payload }) => {
    if (active) {
        const total = payload.reduce((result, entry) => result + entry.value, 0);
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name}: ${((payload[0].value / total) * 100).toFixed(2)}%`}</p>
            </div>
        );
    }
    return null;
};
const PieChartComp = ({data}) => {
    return(
        <ResponsiveContainer width="100%" height="100%">
            <PieChart className="chartP">
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="100%"
                    fill="#8884d8"
                    dataKey="value">
                    {data.map((entry, index)=>(
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip/>}/>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComp;