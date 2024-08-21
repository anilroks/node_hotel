const express = require("express");
const colors = require("colors");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");

const PORT = process.env.PORT || 4008;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");

//Middleware functions
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to my hotel..... how can i help you?we have list of menus");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log(`listening on port 4008`.bgBlue.white);
});
