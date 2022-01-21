const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

// Custom Middleware
app.use((req, res, next) => {
  let validIps = ["::1", "::ffff:10.1.14.214"];

  console.log("remote IP address >>", req.socket.remoteAddress);

  if (validIps.includes(req.socket.remoteAddress)) {
    // IP is ok, so go on
    console.log("IP ok");
    next();
  } else {
    // Invalid ip
    console.log("Bad IP: " + req.socket.remoteAddress);
    const err = new Error("Bad IP: " + req.socket.remoteAddress);
    next(err);
  }
});

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

app.use((err, req, res, next) => {
  console.log("Error handler", err);
  res.status(err.status || 500);
  res.send("Something broke");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
