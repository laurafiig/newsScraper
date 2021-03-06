
// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Comment and Article models
var Comment = require("./models/comment.js");
var Article = require("./models/article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
//mongoose.connect("mongodb://localhost/newsscraper");
mongoose.connect("mongodb://heroku_1bf2q3z4:gm732kl9vcnde54j4a1ic98c0g@ds117348.mlab.com:17348/heroku_1bf2q3z4");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======

// Simple index route
app.get("/", function(req, res) {
  res.send(index.html);
});

// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("http://www.upi.com/Odd_News/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("a").each(function(i, element) {
    // Save an empty result object
    var result = {};
    // Add the text and href of every link, and save them as properties of the result object
    result.title = $(this).attr("title");
    result.link = $(this).attr("href");
    result.description = $(this).children(".desc").text()
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)
    var entry = new Article(result);
      // Now, save that entry to the db
      entry.save(function(err, doc) {
      // Log any errors
      if (err) {
      console.log(err);
      }
      // Or log the doc
      else {
      console.log(doc);
      }
      });  // end save to db
    });  // end each (data grab)
  });  // end request
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});  // end app.get

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Grab article if saved = true
app.get("/saved", function(req, res) {
  // prepare a query that finds saved = true
  Article.find({ "read": true })
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// Listen on port 3000
app.listen(process.env.PORT|| 3000, function() {
 console.log("App running on port 3000!");
});