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
  // image: {
  //   type: String,
  //   required: true,
  // },
  dateOfBirth: {
    type: String,
    required: true,
  },
  stars: Number,

  // totalAbsence: Number,

  studentLevelRate: Number,

  class: {
    type: String,
    required: true,
  },

  // behavior: String,

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

  typeExam: {
    first: {
      subjects: {
        math: {
          mark: String,
          note: String,
          star: Number,
        },
        arbic: {
          mark: String,
          note: String,
          star: Number,
        },
        history: {
          mark: String,
          note: String,
          star: Number,
        },
        english: {
          mark: String,
          note: String,
          star: Number,
        },
        science: {
          mark: String,
          note: String,
          star: Number,
        },
      },
    },
    second: {
      subjects: {
        math: {
          mark: String,
          note: String,
          star: Number,
        },
        arbic: {
          mark: String,
          note: String,
          star: Number,
        },
        history: {
          mark: String,
          note: String,
          star: Number,
        },
        english: {
          mark: String,
          note: String,
          star: Number,
        },
        science: {
          mark: String,
          note: String,
          star: Number,
        },
      },
    },
    final: {
      subjects: {
        math: {
          mark: String,
          note: String,
          star: Number,
        },
        arbic: {
          mark: String,
          note: String,
          star: Number,
        },
        history: {
          mark: String,
          note: String,
          star: Number,
        },
        english: {
          mark: String,
          note: String,
          star: Number,
        },
        science: {
          mark: String,
          note: String,
          star: Number,
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
