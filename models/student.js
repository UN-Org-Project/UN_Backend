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

  typeExam: {
    first: {
      subjects: {
        math: {
          mark: String,
          note: String,
          rate: String,
        },
        arbic: {
          mark: String,
          note: String,
          rate: String,
        },
        history: {
          mark: String,
          note: String,
          rate: String,
        },
        english: {
          mark: String,
          note: String,
          rate: String,
        },
        science: {
          mark: String,
          note: String,
          rate: String,
        },
      },
    },
    second: {
      subjects: {
        math: {
          mark: String,
          note: String,
          rate: String,
        },
        arbic: {
          mark: String,
          note: String,
          rate: String,
        },
        history: {
          mark: String,
          note: String,
          rate: String,
        },
        english: {
          mark: String,
          note: String,
          rate: String,
        },
        science: {
          mark: String,
          note: String,
          rate: String,
        },
      },
    },
    final: {
      subjects: {
        math: {
          mark: String,
          note: String,
          rate: String,
        },
        arbic: {
          mark: String,
          note: String,
          rate: String,
        },
        history: {
          mark: String,
          note: String,
          rate: String,
        },
        english: {
          mark: String,
          note: String,
          rate: String,
        },
        science: {
          mark: String,
          note: String,
          rate: String,
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
