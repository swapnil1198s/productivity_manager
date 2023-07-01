import React from "react";
import "../CSS/PieChartComp.css"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/*Custom component for the tooltip content in order to display values of each section in percentages*/
const CustomTooltip = ({ active, payload, total }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name}: ${((payload[0].value / total) * 100).toFixed(2)}%`}</p>
            </div>
        );
    }
    return null;
};
const PieChartComp = ({data}) => {
    const totalTime = data.reduce(((total, entry)=>total + entry.value), 0); /*initial totalTime = 0 ; end value = sum(all logged time)*/
    return(
        <ResponsiveContainer width="100%" height="90%">
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
                <Tooltip content={<CustomTooltip total={totalTime}/>}/>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComp;