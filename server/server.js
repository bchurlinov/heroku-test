const path = require("path");
const express = require("express");
const ipfilter = require("express-ipfilter").IpFilter;

// Allow the following IPs
const ips = ["62.162.180.176", "127.0.0.1"];

// Create middleware.

const app = express();
const PORT = process.env.PORT || 5000;

app.use(ipfilter(ips, { mode: "allow" }));

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.get("/api/jobs", async (req, res) => {
  try {
    let { description = "", full_time, location = "", page = 1 } = req.query;

    description = description ? encodeURIComponent(description) : "";
    location = location ? encodeURIComponent(location) : "";
    full_time = full_time === "true" ? "&full_time=true" : "";
    if (page) {
      page = parseInt(page);
      page = isNaN(page) ? "" : `&page=${page}`;
    }
    res.send(["cool"]);
  } catch (error) {
    res.status(400).send("Error while getting list of jobs.Try again later.");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
