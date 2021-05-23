import { FLASK_API_PREFIX } from "../api-endpoints";

const TWEET_API = `${FLASK_API_PREFIX}tweets`;
export const TWEET_ENTPOINTS = {
  tweets: `${TWEET_API}?`,
  summary: `${TWEET_API}/summary`,
};
