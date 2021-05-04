const express = require("express");
const { SERVER_PORT } = require('../config')
const app = express();
const data = require('../data/covid-reports/json/cummulative.json')

const pattern = /(st|nd|rd|th|,)/

const sortedArray = data.sort((a, b) => {
    const t1 = new Date(a.date.toLocaleLowerCase().replace(pattern, ''));
    const t2 = new Date(b.date.toLocaleLowerCase().replace(pattern, ''));
    if (t1.getTime() > t2.getTime()) return 1;
    if (t1.getTime() < t2.getTime()) return -1;
    return 0;
})

app.get("/data", (req, res, next) => {
    res.json(sortedArray);
});

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});