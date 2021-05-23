import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { GenInput } from "../../generic/GenInput";
import { GenPills } from "../../generic/GenPills";
import { GenSpinner } from "../../generic/GenSpinner";

import { getAPITweets, getTweetSummary } from "../../utils/api";

import "../../timeline/components/timeline.css";
import { DataTable } from "../../data-table/DataTable";
import {
  getTweetContent,
  removeHandleFromFeed,
  searchAndShuffleFeed,
  transformAPITweetData,
} from "../services/live-timeline.service";
import { DateDisplay } from "../../generic/DateDisplay";
import { TextButtonInput } from "../../generic/TextButtonInput";
import { removeDataAtIndex, upsertSet } from "../../utils/util";
import { DisplaySummary } from "../../generic/DisplaySummary";
import { getSerieDataAtDate } from "../../serie-data-service";
import { InstructionAlert } from "./InstructionAlert";

export const LiveTimeline = () => {
  const rows = [{ header: "Date", key: "date", Component: DateDisplay }];

  const [fromDate, setFormDate] = useState();
  const [toDate, setToDate] = useState();
  const [twitterHandles, setTwitterHandles] = useState(new Set());

  const [searchKeywords, setSearchKeywords] = useState(new Set());

  const [isLoading, setIsLoading] = useState(false);
  const [tweetData, setTweetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [summaryLoaders, setSummaryLoaders] = useState([]);

  const [showSummary, setShowSummary] = useState({
    date: "",
    summary: "",
    covidSnap: {},
    show: false,
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => setShowAlert(true), []);

  const addTweetHandle = (e) => {
    setTwitterHandles(upsertSet(twitterHandles, e));
  };

  const removeHandle = (i) => {
    setTweetData(removeHandleFromFeed(tweetData, i));
    setFilteredData(removeHandleFromFeed(filteredData, i));
    setTwitterHandles(upsertSet(twitterHandles, i, false));
  };

  const handleSearchKeywords = (e, isAdd = true) => {
    setSearchKeywords(upsertSet(searchKeywords, e, isAdd));
    setFilteredData(searchAndShuffleFeed(tweetData, searchKeywords));
  };

  const clearTweets = () => {
    setTweetData([]);
    setFilteredData([]);
  };

  const removeFeed = (i) => {
    setTweetData(removeDataAtIndex(tweetData, i));
    setFilteredData(removeDataAtIndex(filteredData, i));
  };

  const generateSummary = async (i) => {
    console.log("Generating summary");
    if (filteredData[i].summary === "") {
      summaryLoaders[i] = true;
      setSummaryLoaders([...summaryLoaders]);
      const tweets = getTweetContent(filteredData[i].feed);
      try {
        const res = (await getTweetSummary(tweets)).text;
        filteredData[i].summary = res;
      } catch (error) {
        console.log(error);
      }
      summaryLoaders[i] = false;
      setSummaryLoaders([...summaryLoaders]);
    } else {
      setShowSummary({
        date: filteredData[i].series.date,
        summary: filteredData[i].summary,
        covidSnap: getSerieDataAtDate(new Date(filteredData[i].series.date)),
        show: true,
      });
    }
  };

  const getTweets = async () => {
    if (
      twitterHandles.length === 0 ||
      fromDate === undefined ||
      toDate === undefined
    ) {
      window.alert("Please enter a handle or valid dates");
      return;
    }
    setIsLoading(true);

    try {
      const res = await getAPITweets([...twitterHandles], fromDate, toDate);
      const orgApiData = [...transformAPITweetData(res).values()];
      setTweetData(orgApiData);
      setFilteredData(searchAndShuffleFeed(orgApiData, searchKeywords));
      setSummaryLoaders(orgApiData.map(() => false));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {showAlert && <InstructionAlert onClose={() => setShowAlert(false)} />}
      <Row>
        <TextButtonInput label="Twitter handle" addText={addTweetHandle} />
        <Col>
          <GenPills data={[...twitterHandles]} onDelete={removeHandle} />
        </Col>
      </Row>
      <hr />
      <Row>
        <TextButtonInput
          label="Search keywords"
          addText={(e) => handleSearchKeywords(e)}
        />
        <Col>
          <GenPills
            data={[...searchKeywords]}
            onDelete={(e) => handleSearchKeywords(e, false)}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12} md={2}>
          <GenInput
            type="date"
            label="From"
            onClick={(e) => setFormDate(e.target.value)}
          />
        </Col>
        <Col xs={12} md={2}>
          <GenInput
            type="date"
            label="To"
            onClick={(e) => setToDate(e.target.value)}
          />
        </Col>
        <Col xs={6} md={1}>
          <Button variant="primary" type="submit" onClick={getTweets}>
            Get tweets
          </Button>
        </Col>
        <Col xs={6} md={1}>
          <Button variant="secondary" type="submit" onClick={clearTweets}>
            Clear
          </Button>
        </Col>
      </Row>
      <hr />
      <GenSpinner isLoading={isLoading} />
      {!isLoading && (
        <DataTable
          rows={rows}
          displayData={filteredData}
          summaryLoaders={summaryLoaders}
          onClose={removeFeed}
          genSummary={generateSummary}
        />
      )}
      <DisplaySummary
        summary={showSummary}
        onHide={() =>
          setShowSummary({ date: "", summary: "", covidSnap: {}, show: false })
        }
      />
    </>
  );
};
