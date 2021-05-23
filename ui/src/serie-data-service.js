import { deepCopy } from "./utils/util";

let _serieData = [];
let _serieDataMap = new Map();

export const setUpSerieData = (res) => {
  _serieData = res;
  _serieDataMap = new Map(res.map((x) => [new Date(x.date).toDateString(), x]));
};

export const getSerieData = () => deepCopy(_serieData);

export const getSerieDataAtDate = (d) => _serieDataMap.get(d.toDateString());
