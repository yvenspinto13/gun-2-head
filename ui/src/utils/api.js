import { TWEET_ENTPOINTS } from "../constants/tweet-api";
import { getAPIDateString } from "./date";
import { getRequest, postRequest } from "./http";

export const getAPITweets = (sites, from, to) =>
  getRequest(
    `${process.env.REACT_APP_TWEET_API}${
      TWEET_ENTPOINTS.tweets
    }site=${sites}&to=${getAPIDateString(to)}&from=${getAPIDateString(from)}`,
    "./liveTweets"
  );

export const getTweetSummary = (tweets) =>
  postRequest(
    `${process.env.REACT_APP_SUMMARY_API}${TWEET_ENTPOINTS.summary}`,
    {
      tweetData: tweets,
    }
  );
