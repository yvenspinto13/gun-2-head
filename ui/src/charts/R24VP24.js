import { Line } from 'react-chartjs-2';
import { getDateLabel } from '../utils/date';
import { options } from "./line-options";

export const R24VP24 = ({ caseData }) => {
    const data = {
        labels: caseData?.map(x => getDateLabel(x.date)),
        datasets: [
            {
                label: '# of Recoveries',
                data: caseData?.map(x => x.recovery_24),
                fill: false,
                backgroundColor: '#0061a8',
                borderColor: '#8ab6d6',
            },
            {
                label: '# of Positive tests',
                data: caseData?.map(x => x.total_cases.new),
                fill: false,
                backgroundColor: '#ff8882',
                borderColor: '#ffc2b4',
            }
        ],
    };

    return (
        <div className="chart-wrapper">
            {caseData.length > 0 && <Line data={data} options={options} />}
        </div>
    )
}