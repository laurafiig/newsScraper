
// Require mongoose
var mongoose = require("mongoose");

// Create a schema class
var Schema = mongoose.Schema;

// Create the schema
var CommentSchema = new Schema({
  body: {
    type: String
  }
});

// Create the model with the Schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
