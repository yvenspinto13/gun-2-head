import { useEffect, useState } from "react";
import { Button, Col, FormControl, FormLabel, InputGroup, Row, Spinner } from "react-bootstrap"
import { getRequest } from "../utils/http";
import { shuffleArray } from "../utils/shuffle";
import { DataTable } from "./DataTable";
import { search } from "ss-search"

import './timeline.css';

export const Timeline = () => {

    const [displayData, setDisplayData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [keysData, setKeysData] = useState([]);

    const [newsData, setNewsData] = useState({});
    const [cmpDate, setCmpDate] = useState();

    // time series data
    const [serieData, setSerieData] = useState([])
    const [selectedDates] = useState(new Set());

    // loader
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        let nData = {};
        const keys = [];

        getRequest('./data.json').then(res => setSerieData(res));

        async function fetchData() {
            const newsSources = [{ key: 'prudent', url: './prudentgoa.json' },
            { key: 'ingoa', url: './InGoa24x7.json' },
            { key: 'gnewshub', url: './goanewshub.json' },
            { key: 'primetv', url: './PrimeTVGoa.json' }]
            for (const i of newsSources) {
                try {
                    const res = await getRequest(i.url)
                    nData[i.key] = res;
                    keys.push(i.key)
                } catch (error) {
                    console.log(error)
                }
            }
            setKeysData(keys)
            setNewsData(nData)
        }
        fetchData()
    }, [])

    const getData = () => {
        if (selectedDates.has(cmpDate.toDateString())) {
            return;
        }
        const displayObj = {};
        displayObj['series'] = filterDate(serieData, cmpDate)[0] || null
        let feed = [];
        for (const i of keysData) {
            feed = feed.concat(filterDate(newsData[i], cmpDate))
        }
        displayObj['feed'] = shuffleArray(feed);
        if (displayObj['series']) {
            const ddata = [...displayData]
            ddata.push(displayObj)
            setDisplayData(ddata)
            if (searchText === '') {
                setFilteredData(deepCopy(ddata))
            } else {
                const fObj = { ...displayObj }
                fObj['feed'] = search(displayObj['feed'], ["content"], searchText)
                const f = [...filteredData]
                f.push(fObj)
                setFilteredData(f)
            }

        }
        selectedDates.add(cmpDate.toDateString())
    }

    const filterDate = (res, d) => res.filter(x => new Date(x.date).toDateString() === d.toDateString());

    // const mapDate = res => res.map(x => ({ ...x, date: new Date(x.date) }));

    const removeColumn = (e) => {
        const d = [...displayData];
        const f = [...filteredData];
        f.splice(e, 1)
        const del = d.splice(e, 1)[0];
        selectedDates.delete(new Date(del.series.date).toDateString())
        setDisplayData(d);
        setFilteredData(f);
    }

    const filterData = (e) => {
        setSearchText(e);
        setIsLoading(true);
        if (e === '') {
            setFilteredData(deepCopy(displayData));
        } else {
            const fil = deepCopy(displayData)
            for (let i = 0; i < displayData.length; i++) {
                fil[i].feed = search(fil[i].feed, ["content"], e)
            }
            setFilteredData(fil)
            console.log('dd', displayData)
        }
        setIsLoading(false)

    }

    const deepCopy = (d) => JSON.parse(JSON.stringify(d))

    return (
        <>
            <div className="form-in">
                <Row>
                    <Col />
                    <Col>
                        <InputGroup className="mb-6">
                            <FormLabel style={{ margin: 'auto 5px' }}>Enter Date</FormLabel>
                            <FormControl
                                type="date" placeholder="Enter date" onChange={(e) => setCmpDate(new Date(e.target.value))}
                            />
                            <Button className="btn" variant="primary" type="submit" onClick={cmpDate && getData}>
                                Fetch
                        </Button>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search tweets"
                                aria-label="Search tweets"
                                onChange={(e) => filterData(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col />
                </Row>
            </div>
            {isLoading && <Spinner animation="border" variant="secondary" />}
            {!isLoading && <DataTable displayData={filteredData} onClose={removeColumn} />}
        </>
    )
}