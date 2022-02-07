const path = require("path");
const express = require("express");
const requestIp = require("request-ip");

const app = express();
const PORT = process.env.PORT || 5000;

// Custom Middleware
// app.use((req, res, next) => {
//   let validIps = ["62.162.180.176", "89.205.124.197"];

//   var clientIp = requestIp.getClientIp(req);
//   console.log("CLIENT IP >>", clientIp);

//   if (validIps.includes(clientIp)) {
//     // IP is ok, so go on
//     next();
//   } else {
//     // Invalid ip
//     const err = new Error("Bad IP: " + req.socket.remoteAddress);
//     next(err);
//   }
// });

app.use(requestIp.mw({ attributeName: "myCustomAttributeName" }));
// respond to all requests
app.use(function (req, res) {
  // use our custom attributeName that we registered in the middleware
  var ip = req.myCustomAttributeName;
  console.log(ip);

  // https://nodejs.org/api/net.html#net_net_isip_input
  var ipType = net.isIP(ip); // returns 0 for invalid, 4 for IPv4, and 6 for IPv6
  res.end("Hello, your ip address is " + ip + " and is of type IPv" + ipType + "\n");
});

// const buildPath = path.join(__dirname, "..", "build");
// app.use(express.static(buildPath));

app.use((err, req, res, next) => {
  console.log("Error handler", err);
  res.status(err.status || 500);
  res.send("You are not allowed to visit this web app");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
