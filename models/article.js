
// Require mongoose
var mongoose = require("mongoose");

// Create Schema class
var Schema = mongoose.Schema;

// Create schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the model with the Schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
