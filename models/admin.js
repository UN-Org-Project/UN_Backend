var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create ParentSchema
var adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailAdress: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  }
});

// Create model from the schema
module.exports = mongoose.model("Admin", adminSchema);
