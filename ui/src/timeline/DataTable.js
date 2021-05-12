import { DateDisplay } from './DateDisplay';
import { Cummulative } from './Cummulative';
import { Feed } from './Feed';
import { Percentage } from './Percentage';
import { Button } from 'react-bootstrap';

export const DataTable = ({ displayData = [], onClose }) => {
    const rows = [{ header: 'Date', key: 'date', Component: DateDisplay },
    { header: 'Tested', key: 'tested', Component: Cummulative },
    { header: 'Total Cases', key: 'total_cases', Component: Cummulative },
    { header: 'Deaths', key: 'deaths', Component: Cummulative },
    { header: 'Recovery Rate', key: 'recovery_rate', Component: Percentage },
    { header: 'Positivity Rate', key: 'positivity_rate', Component: Percentage }]

    return (
        <div className="flex-grid">
            {/* fixed column */}
            <div className="col-head">
                {rows.map(x => (
                    <div key={`head_${x.key}`} className="flex-grid">
                        {x.header}
                    </div>
                ))}
                <div className="flex-grid mt-10">
                    Feed
                </div>
            </div>
            <div className="col-content">
                {displayData.map((x, i) => (
                    <div key={i} className="col col-max">
                        {rows.map(r => (
                            <div key={`${i}_${r.key}`} className="flex-grid">
                                <r.Component data={x.series[r.key]} />
                                {r.key === 'date' &&
                                    <Button className="close-bt" size="sm" variant="link" onClick={() => onClose(i)}>Close</Button>}
                            </div>
                        ))}
                        <div className="feed-ctn mt-10">
                            <Feed key={`${i}_feed`} data={x.feed} />
                        </div>
                    </div>))}
            </div>
        </div>
    );
}