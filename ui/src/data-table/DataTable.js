import { Feed } from "./Feed";
import { Button } from "react-bootstrap";
import { GenSpinner } from "../generic/GenSpinner";

export const DataTable = ({
  displayData = [],
  rows = [],
  summaryLoaders,
  onClose,
  genSummary,
}) => {
  return (
    <div className="flex-grid">
      {/* fixed column */}
      <div className="col-head">
        {rows.map((x) => (
          <div key={`head_${x.key}`} className="flex-grid">
            {x.header}
          </div>
        ))}
        <div className="flex-grid mt-10">Feed</div>
      </div>
      <div className="col-content">
        {displayData.map((x, i) => (
          <div key={i} className="col col-max">
            {rows.map((r) => (
              <div key={`${i}_${r.key}`} className="flex-grid">
                <r.Component data={x.series[r.key]} />
                {r.key === "date" && (
                  <Button
                    className="close-bt"
                    size="sm"
                    variant="link"
                    onClick={() => onClose(i)}
                  >
                    Close
                  </Button>
                )}
              </div>
            ))}
            <div className="feed-ctn mt-10">
              <Feed key={`${i}_feed`} data={x.feed} />
            </div>
            {x.feed && x.feed.length > 1 && genSummary && (
              <div style={{ margin: "10px 0" }}>
                {summaryLoaders[i] && <GenSpinner variant="primary" />}
                {!summaryLoaders[i] && (
                  <>
                    <Button key={`${i}_summary`} onClick={() => genSummary(i)}>
                      {x.summary === "" ? "Get " : "View "}
                      Summary
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
