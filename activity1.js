// ITE5315--Professor: Shahdad

// step3: Answer the following questions:

// a) identify all ROUTES in this app.
// '/' root route
// '/register' - get and post route

// b) How form-data-validation is implemented in this app.
// we are doing form validation using express-validator
// and checking the username and the email in the form-data-validation

// c) Identify all middle wares in this app.
// "urlencodedParser" is a midddleware function

// d) Identify "template engine views" in this app.
// The template engine views in this app is handlebars
// here's how we are setting it
// const handlebars = require("express-handlebars");
// app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
// app.set("view engine", "hbs");

// e) What is the role of "body-parser" in this app? Can we remove it?
// The role of "body-parser" (urlencodedParser in this case) is to parse form data in POST requests. It's necessary for processing form submissions. You cannot remove it because without it, you won't be able to access the form data in the request body.

// f)What if the role of two <script> block inside the "register.hbs" and "index.hbs" ?
// The <script> blocks in the "register.hbs" and "index.hbs" templates are used to include JavaScript code that can be executed on the client side (in the browser). These scripts can be used for client-side interactivity and behavior. They are not directly related to the server-side functionality of the application. In this example we are using JQuery and bootstrap libraries for example to perform the css for the webpage.

const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const app = express();
const port = 5000;

// Set Templating Enginge
const handlebars = require("express-handlebars");
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Navigation
app.get("", (req, res) => {
  res.render("index", {
    layout: false, // do not use the default Layout (main.hbs)
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    layout: false, // do not use the default Layout (main.hbs)
  });
});

app.post(
  "/register",
  urlencodedParser,
  [
    check("username", "This username must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(422).jsonp(errors.array())

      const alert = errors.array();
      res.render("register", {
        errs: alert,
        layout: false, // do not use the default Layout (main.hbs)
      });
    } else {
      //   const userData = console.log(userData);

      res.render("output", {
        data: {
          username: req.body.username,
          email: req.body.email,
          paragraph: "This is my webpage",
        },
        layout: false,
      });
    }
  }
);

app.listen(port, () => console.info(`App listening on port: ${port}`));
