
// Require mongoose
var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

// Create Schema class
var Schema = mongoose.Schema;

// Create schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true, 
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
    saved: {
    type: Boolean,
    default: false,
    required: true
  },  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});


// Apply the uniqueValidator plugin to userSchema. 
ArticleSchema.plugin(uniqueValidator);

// Create the model with the Schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;

      
