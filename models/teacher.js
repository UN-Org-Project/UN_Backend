var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create TeacherSchema
var TeacherSchema = new Schema({
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
  telepohoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  experiance: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  allStudents: [
    //this for tell db we want store students as objects
    {
      type: Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  state: {
    type: String,
    required: true
  },
  allNotes: []

  //students: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Student",
  //   },
  // ],
});

// Create model from the schema
module.exports = mongoose.model("Teacher", TeacherSchema);
