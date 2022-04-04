import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import millify from 'millify';
import { barChartData } from '../../assets/data/chartData';

const BarChartComp = () => {
    return (
        <ResponsiveContainer>
            <BarChart width={500} height={300} data={barChartData}>
                <XAxis
                    dataKey='date'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#fff' }}
                    tickFormatter={unixTime => {
                        const date = new Date(unixTime);
                        return date.getDate();
                    }}
                    tickCount={15}
                />
                <YAxis
                    dataKey='value'
                    axisLine={false}
                    tickLine={false}
                    orientation='right'
                    tick={{ fill: '#fff', fontSize: '12px' }}
                    tickFormatter={tick =>
                        `$${millify(tick, { precision: 2 })}`
                    }
                    type='number'
                    tickCount={6}
                />
                <Tooltip wrapperClassName='invisible hidden' />
                <Bar dataKey='value' fill='#1dc872' />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComp;
