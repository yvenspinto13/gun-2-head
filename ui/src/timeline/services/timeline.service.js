import { getRequest } from "../../utils/http";

export const fetchData = async () => {
  let nData = {};
  const keys = [];
  const newsSources = [
    { key: "prudent", url: "./prudentgoa.json" },
    { key: "ingoa", url: "./InGoa24x7.json" },
    { key: "gnewshub", url: "./goanewshub.json" },
    { key: "primetv", url: "./PrimeTVGoa.json" },
  ];
  for (const i of newsSources) {
    try {
      const res = await getRequest(i.url);
      nData[i.key] = res;
      keys.push(i.key);
    } catch (error) {
      console.log(error);
    }
  }
  return {
    keys,
    nData,
  };
};
