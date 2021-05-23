export const Footer = () => (
  <div
    style={{
      padding: "20px 0",
      position: "fixed",
      bottom: "0",
      backgroundColor: "whitesmoke",
      left: "0",
    }}
  >
    <p>
      Please note, the data is collected from https://www.goa.gov.in/covid-19/
    </p>
    <p style={{ margin: "0" }}>
      Data was extracted using a python script. As the bulk of the data could
      not be verified via manually, random sample tests were carried out. There
      is ongoing effort to manually check the data. If there is any issue with
      the data, please drop a mail at yvenspinto13@gmail.com. Thank you!
    </p>
  </div>
);
