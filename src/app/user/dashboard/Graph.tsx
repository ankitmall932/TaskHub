'use client';

import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function Graph ( { inProgress, completed, pending }: { inProgress: number, completed: number, pending: number; } )
{
    const chartData = [
        {
            name: 'Pending',
            value: pending,
            fill: 'red'
        },
        {
            name: 'InProgress',
            value: inProgress,
            fill: 'green'
        },
        {
            name: 'Completed',
            value: completed,
            fill: 'blue'
        }
    ];
    return (
        <div className="h-72 w-full border border-gray-500 rounded-2xl mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={ chartData } dataKey={ 'value' } nameKey={ 'name' } cx="50%" cy="45%" outerRadius={ 90 } />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
