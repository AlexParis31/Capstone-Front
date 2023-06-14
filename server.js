const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "client/build")))
// process.env.PORT
// process.env.NODE_ENV => production or undefined


// Middleware
app.use(cors())
app.use(express.json());

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}
console.log(path.join(__dirname, "client/build"))

//ROUTES//

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// dashboard route

app.use("/dashboard", require("./routes/dashboard"));





app.listen(PORT, () => {
    console.log("server started");
});