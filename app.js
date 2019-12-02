const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  PORT = process.env.PORT || 5000,
  Layouts = require("express-ejs-layouts"),
  nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(Layouts);

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.post("/contact", (req, res) => {
  const { email, phone, comment } = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "temptempemail20@gmail.com",
      pass: "abcdfg12"
    }
  });

  var mailOptions = {
    from: "temptempemail20@gmail.com",
    to: "neildahiya1@gmail.com",
    subject: email,
    text: comment
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.render("home.ejs");
});
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
