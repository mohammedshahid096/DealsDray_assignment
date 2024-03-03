const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDataBaseConn = require("./Config/mongodb.config");
const IndexRoutes = require("./Routes/index.routes");
const path = require("path");

const app = express();
// env config
dotenv.config();

// connecting to db
MongoDataBaseConn();

// using  parsing dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// cors config
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//
app.use("/public", express.static(__dirname + path.join("/public/uploads")));
app.use("/api/v1/", IndexRoutes);
app.use("*", (req, res) => {
  res.status(500).json({
    success: false,
    statusCode: 500,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// response for error message
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || "internal server error",
    stack: err.stack || "not present",
  });
});

// server listening
app.listen(process.env.PORT || 8001, () => {
  console.log(
    "server is running on:  http://localhost:" + process.env.PORT || 8001
  );
});
