//1- require express
const express = require("express");

//2-instance of express
const app = express();

//5- require dotenv && configure
require("dotenv").config();

//6-connect to db
const connectDB = require("./config/connectDB");
connectDB();

//8-middleware
app.use(express.json());
// require routes

// import routes
app.use("/api/user", require("./routes/User"));
app.use("/api/recruteur", require("./routes/Recruteur"));
app.use("/api/offre", require("./routes/offre"));
app.use("/api/Cv", require("./routes/cv"));
app.use("/api/admin", require("./routes/admin"));

// 3-port
const PORT = process.env.PORT;

//4- create server
app.listen(PORT, (error) =>
  error
    ? console.console.error(error)
    : console.log(`server is running on port ${PORT}...`)
);
