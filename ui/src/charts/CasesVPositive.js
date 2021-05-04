import { Line } from 'react-chartjs-2';
import { getDateLabel } from '../utils/date';
import { options } from "./line-options";

export const CasesVPositive = ({ caseData }) => {
    const data = {
        labels: caseData?.map(x => getDateLabel(x.date)),
        datasets: [
            {
                label: '# of Tests',
                data: caseData?.map(x => x.tested.new),
                fill: false,
                backgroundColor: '#fb3640',
                borderColor: '#fb3640',
            },
            {
                label: '# of Positive tests',
                data: caseData?.map(x => x.total_cases.new),
                fill: true,
                backgroundColor: '#542e71',
                borderColor: '#542e71',
            }
        ],
    };

    return (
        <div className="chart-wrapper">
            {caseData.length > 0 && <Line data={data} options={options} />}
        </div>
    )
}