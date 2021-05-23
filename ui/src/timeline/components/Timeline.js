import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import { shuffleArray } from "../../utils/shuffle";
import { DataTable } from "../../data-table/DataTable";
import { Percentage } from "../../generic/Percentage";
import { DateDisplay } from "../../generic/DateDisplay";
import { Cummulative } from "../../generic/Cummulative";
import { search } from "ss-search";

import "./timeline.css";
import { GenSpinner } from "../../generic/GenSpinner";
import { deepCopy, filterDate } from "../../utils/util";
import { fetchData } from "../services/timeline.service";
import { getSerieDataAtDate } from "../../serie-data-service";

export const Timeline = () => {
  const [displayData, setDisplayData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [keysData, setKeysData] = useState([]);

  const [newsData, setNewsData] = useState({});
  const [cmpDate, setCmpDate] = useState();

  // time series data
  const [selectedDates] = useState(new Set());

  // loader
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // data table rows
  const rows = [
    { header: "Date", key: "date", Component: DateDisplay },
    { header: "Tested", key: "tested", Component: Cummulative },
    { header: "Total Cases", key: "total_cases", Component: Cummulative },
    { header: "Deaths", key: "deaths", Component: Cummulative },
    { header: "Recovery Rate", key: "recovery_rate", Component: Percentage },
    {
      header: "Positivity Rate",
      key: "positivity_rate",
      Component: Percentage,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const { keys, nData } = await fetchData();
      setKeysData(keys);
      setNewsData(nData);
    };
    getData();
  }, []);

  const getData = () => {
    if (selectedDates.has(cmpDate.toDateString())) {
      return;
    }
    const displayObj = {};
    displayObj["series"] = getSerieDataAtDate(cmpDate) || null;
    let feed = [];
    for (const i of keysData) {
      feed = feed.concat(filterDate(newsData[i], cmpDate));
    }
    displayObj["feed"] = shuffleArray(feed);
    if (displayObj["series"]) {
      const ddata = [...displayData];
      ddata.push(displayObj);
      setDisplayData(ddata);
      if (searchText === "") {
        setFilteredData(deepCopy(ddata));
      } else {
        const fObj = { ...displayObj };
        fObj["feed"] = search(displayObj["feed"], ["content"], searchText);
        const f = [...filteredData];
        f.push(fObj);
        setFilteredData(f);
      }
    }
    selectedDates.add(cmpDate.toDateString());
  };

  // const mapDate = res => res.map(x => ({ ...x, date: new Date(x.date) }));

  const removeColumn = (e) => {
    const d = [...displayData];
    const f = [...filteredData];
    f.splice(e, 1);
    const del = d.splice(e, 1)[0];
    selectedDates.delete(new Date(del.series.date).toDateString());
    setDisplayData(d);
    setFilteredData(f);
  };

  const filterData = (e) => {
    setSearchText(e);
    setIsLoading(true);
    if (e === "") {
      setFilteredData(deepCopy(displayData));
    } else {
      const fil = deepCopy(displayData);
      for (let i = 0; i < displayData.length; i++) {
        fil[i].feed = search(fil[i].feed, ["content"], e);
      }
      setFilteredData(fil);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="form-in">
        <Row>
          <Col md={2} />
          <Col xs={12} md={4} className="padt-5">
            <InputGroup className="mb-6">
              <FormLabel style={{ margin: "auto 5px" }}>Enter Date</FormLabel>
              <FormControl
                type="date"
                placeholder="Enter date"
                onChange={(e) => setCmpDate(new Date(e.target.value))}
              />
              <Button
                className="btn"
                variant="primary"
                type="submit"
                onClick={cmpDate && getData}
              >
                Fetch
              </Button>
            </InputGroup>
          </Col>
          <Col xs={12} md={4} className="padt-5">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search tweets"
                aria-label="Search tweets"
                onChange={(e) => filterData(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={2} />
        </Row>
      </div>
      <GenSpinner isLoading={isLoading} />
      {!isLoading && (
        <DataTable
          displayData={filteredData}
          rows={rows}
          onClose={removeColumn}
        />
      )}
    </>
  );
};
