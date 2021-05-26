import { Footer } from "../footer/Footer";

const Atag = ({ link, text }) => (
  <a style={{ color: "#007bff" }} href={link}>
    {text}
  </a>
);

export const About = () => (
  <>
    <p>
      Why ? <br />
      As I watched in horror the cruelty that occurred just due to gross
      mismanagement, I could take it no longer. I needed something to show why
      the Government of Goa has errored and how their incompetence plunges us
      into further darkness.
    </p>

    <p>
      The application is called gun-2-head <br />
      Why ? <br />
      Metaphorically , if a gun was pointed to the heads of the people in power,
      would they lie ? Or would they speak the truth. Well it doesn't matter,
      because I will collect the data to prove that they indeed are responsible.
      The application currently has 2 sections, Graphs and Timeline. The Graphs
      section allows you to see the various metrics, such as deaths per day,
      number of tests vs number of positive cases etc The Timeline section
      allows a user to select a day and then see what was tweeted on that day by
      goan news outlets. Currently I've gathered the data from prudent, primetv
      , ingoa and goa news hub
      <br />
      <br />
      The data from the graph section is gathered from the{" "}
      <Atag link="https://www.goa.gov.in/covid-19/" text="Goa media bulletin" />
      <br />
      <br />
      The data currently is gathered and stored in this{" "}
      <Atag
        link="https://github.com/yvenspinto13/gun-2-head"
        text="GitHub repo"
      />
      , as there is no guarantee of past reports/tweets being deleted
      <br />
      <br />
      This effort is still a work in progress, I plan on adding more
      functionality to view the data that truly shows how bad the situation is
      and that the people that are in charge are the only ones to blame. It is a
      memorial, the numbers are not just numbers, they are human beings, that
      could have been saved, and this, this will not be forgotten.
    </p>
    <p>
      Please note, the data is collected from https://www.goa.gov.in/covid-19/
    </p>
    <p>
      Data was extracted using a python script. As the bulk of the data could
      not be verified via manually, random sample tests were carried out. There
      is ongoing effort to manually check the data. If there is any issue with
      the data, please drop a mail at yvenspinto13@gmail.com. Thank you!
    </p>
  </>
);
