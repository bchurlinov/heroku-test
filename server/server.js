const path = require("path");
const AccessControl = require("express-ip-access-control");
const express = require("express");
const app = express();

const options = {
  mode: "deny",
  denys: [],
  allows: ["62.162.180.176"],
  forceConnectionAddress: false,
  log: function (clientIp, access) {
    console.log(clientIp + (access ? " accessed." : " denied."));
  },

  statusCode: 401,
  redirectTo: "",
  message: "Unauthorized",
};

// Create middleware.
const middleware = AccessControl(options);

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));
app.use(AccessControl(options));

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
