const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const app = express();

const port = process.env.port || process.env.PORT || 3000;

app.use(expressLayout);
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/cart", (req, res) => {
  res.render("cart/index");
});
app.get("/register", (req, res) => {
  res.render("auth/register");
});
app.get("/login", (req, res) => {
  res.render("auth/login");
});
app.listen(port, () => console.log(`listen on ${port}`));
