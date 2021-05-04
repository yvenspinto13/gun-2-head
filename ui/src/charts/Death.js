import { Line } from 'react-chartjs-2';
import { getDateLabel } from '../utils/date';
import { options } from './line-options';

export const DeathChart = ({ deathData = [] }) => {
    const data = {
        labels: deathData?.map(x => getDateLabel(x.date)),
        datasets: [
            {
                label: '# of Deaths',
                data: deathData?.map(x => x.deaths.new),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    
    return (
        <div className="chart-wrapper">
            {deathData.length > 0 && <Line data={data} options={options} />}
        </div>
    )
}