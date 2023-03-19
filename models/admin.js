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

  allStudents: [
    Object, //this for tell db we want store students as objects
    {
      type: Schema.Types.ObjectId,
      ref: "Student"
    }
  ],
  allParents: [
    Object, //this for tell db we want store students as objects
    {
      type: Schema.Types.ObjectId,
      ref: "Parent"
    }
  ],
  allTeacher: [
    Object, //this for tell db we want store students as objects
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher"
    }
  ],
  state: {
    type: String,
    required: true
  }
});

// Create model from the schema
module.exports = mongoose.model("Admin", adminSchema);
