const express = require("express");
const cors = require("cors");
const { SERVER_PORT } = require('../config')

const app = express();
const data = require('../data/covid-reports/json/cummulative.json')

app.use(cors())

const pattern = /(st|nd|rd|th|,)/

const dataDate = data.map(x => ({ ...x, date: new Date(x.date.toLocaleLowerCase().replace(pattern, '')) }))

const sortedArray = dataDate.sort((a, b) => {
    if (a.date.getTime() > b.date.getTime()) return 1;
    if (a.date.getTime() < b.date.getTime()) return -1;
    return 0;
})

app.get("/data", (req, res, next) => {
    const { from, to } = req.query;
    if (from && to) {
        const filteredData = sortedArray.filter((item) => {
            return item.date.getTime() >= new Date(from).getTime() &&
                item.date.getTime() <= new Date(to).getTime();
        });
        return res.json(filteredData);
    }
    return res.json(sortedArray);
});

app.get("/raw", (req, res, next) => {
    res.json(data);
});

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});