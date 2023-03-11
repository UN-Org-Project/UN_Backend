var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a StudentSchema
var StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  //absence:[Object],
  absence: [
    Object, //this for tell db we want store students as objects
  ],

  subjects: [Object],

  class: {
    type: String,
    required: true,
  },
  numberOfAbsenceDays: {
    type: Number,
    required: true,
  },
  behavior: {
    type: String,
    required: true,
  },
  id: {
    type: Schema.Types.ObjectId, //this for tell database create _id for the student
  },
});

// Create model from the schema
module.exports = mongoose.model("Student", StudentSchema);
