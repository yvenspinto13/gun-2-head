import { Line } from 'react-chartjs-2';
import { getDateLabel } from '../utils/date';
import { options } from "./line-options";

export const PRVRR = ({ caseData }) => {
    const data = {
        labels: caseData?.map(x => getDateLabel(x.date)),
        datasets: [
            {
                label: 'Positivity Rate (%)',
                data: caseData?.map(x => x.positivity_rate),
                fill: false,
                backgroundColor: '#34656d',
                borderColor: '#75beca',
            },
            {
                label: 'Recovery Rate (%)',
                data: caseData?.map(x => x.recovery_rate),
                fill: false,
                backgroundColor: '#e1701a',
                borderColor: '#f7a440',
            }
        ],
    };

    return (
        <div className="chart-wrapper">
            {caseData.length > 0 && <Line data={data} options={options} />}
        </div>
    )
}