import { search } from "ss-search";
import { shuffleArray } from "../../utils/shuffle";
import { deepCopy } from "../../utils/util";

export const transformAPITweetData = (res) => {
  const dMap = new Map();
  for (const i of res) {
    for (const j of i.feed) {
      const jd = new Date(j.date);
      const mapData = dMap.get(jd.toDateString());
      if (mapData) {
        mapData.feed.push(j);
      } else {
        dMap.set(jd.toDateString(), {
          series: { date: jd },
          feed: [j],
          summary: "",
        });
      }
    }
  }
  console.log([...dMap.values()]);
  return dMap;
};

const getUniqueFeed = (feed, keywords) => {
  if (keywords.length === 0) {
    return feed;
  }
  let mergeMap = new Map();
  for (const k of keywords) {
    const searchFeed = search(feed, ["content"], k);
    const concatFeed = [...mergeMap].concat(searchFeed.map((x) => [x.id, x]));
    mergeMap = new Map(concatFeed);
  }
  return [...mergeMap.values()];
};

export const searchAndShuffleFeed = (orgArray, keywords) => {
  keywords = [...keywords];
  console.log("Searching with keywords", keywords);
  const replicate = deepCopy(orgArray);
  const filteredArray = [];
  for (const i of replicate) {
    console.log(i);
    const obj = i;
    obj.feed = shuffleArray(getUniqueFeed(i.feed, keywords));
    obj.summary = "";
    filteredArray.push(obj);
  }
  return filteredArray;
};

export const removeHandleFromFeed = (orgArray, handle) => {
  orgArray = deepCopy(orgArray);
  for (const i of orgArray) {
    i.feed = i.feed.filter((x) => x.username !== handle);
  }
  return orgArray;
};

export const getTweetContent = (orgArray) =>
  orgArray.map((x) =>
    x.content.replace(
      new RegExp(`#+([a-zA-Z0-9_]+)|via (@+)${x.username}`, "gi"),
      ""
    )
  );
