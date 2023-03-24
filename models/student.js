var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  studentName: {
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
  stars: Number,

  // totalAbsence: Number,
<<<<<<< HEAD

  studentLevelRate: Number,
=======
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82

  studentLevelRate : Number,
  
  class: {
    type: String,
    required: true,
  },

  behavior: String,

  notes: [
    {
      note: String,
      noteDate: { type: Date, default: Date.now() },
      _id: false, //this for stop creating auto _id
    },
  ],
  absence: [
    {
      absecnceState: String,
      abcenceDate: { type: Date, default: Date.now() },
      _id: false,
    },
  ],

  dalyRate: [
    {
      star: Number,
      _id: false,
    },
  ],
<<<<<<< HEAD
=======

>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
  typeExam: {
    first: {
      subjects: {
        math: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        arbic: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        history: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        english: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        science: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
      },
    },
    second: {
      subjects: {
        math: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        arbic: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        history: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        english: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        science: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
      },
    },
    final: {
      subjects: {
        math: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        arbic: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        history: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        english: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
        science: {
          mark: String,
          note: String,
<<<<<<< HEAD
          star: Number,
=======
          rate: String,
>>>>>>> 0e0233e9c999bf8e9403365c560c910ff832ff82
        },
      },
    },
    _id: false,
  },

  id: {
    type: Schema.Types.ObjectId, //this for tell database create _id for the student
  },
});

module.exports = mongoose.model("Student", StudentSchema);
