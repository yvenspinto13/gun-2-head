import { Button, Modal } from "react-bootstrap";
import { Cummulative } from "./Cummulative";
import { DateDisplay } from "./DateDisplay";
import { Percentage } from "./Percentage";

const SnapDisplay = ({ data, show }) => {
  const rows = [
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

  return (
    <>
      <h5>
        <em>Covid Snapshot</em>
      </h5>
      {show && data && (
        <p>
          {rows.map((r) => (
            <>
              {r.header}:&nbsp;
              {data && data[r.key] && (
                <r.Component key={r.key} data={data[r.key]} />
              )}
              <br />
            </>
          ))}
        </p>
      )}
      {show && data === undefined && (
        <p>Covid data not extracted for this day</p>
      )}
    </>
  );
};

export const DisplaySummary = ({ summary, onHide }) => (
  <Modal
    onHide={onHide}
    show={summary.show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Summary</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>
        <DateDisplay data={summary.date} />
      </h4>
      <SnapDisplay show={summary.show} data={summary.covidSnap} />
      <h5>Generated Summary</h5>
      <p>{summary.summary}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);
