const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const data = require("./data");
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  try {
    let { sort } = req.query;

    let re = [];
    if (sort == "Default") {
      re = data.sort((a, b) => a.releasedDate.localeCompare(b.releasedDate));
    } else if (sort == "Name") {
      re = data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort == "Rating") {
      re = data.sort((a, b) => a.rating - b.rating);
    } else {
      re = data;
    }

    res.send({
      data: re,
    });
  } catch (e) {
    console.error(e);
  }
});

app.get("/search", (req, res) => {
  try {
    let { search } = req.query;

    let results = [];
    data.forEach((e) => {
      if (e.name.toLowerCase().includes(search.toLowerCase())) {
        results.push(e);
      }
    });

    res.send({
      data: results,
    });
  } catch (e) {
    console.error(e);
  }
});
app.listen(3005, (err) =>
  err ? console.error(err) : console.log("server is listening on 3005")
);
