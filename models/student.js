var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
  totalRate: Number,

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
      stare: Number,
      _id: false,
    },
  ],
  typeExam: [
    {
      first: {
        subjects: {
          math: {
            mark: Number,
            note: String,
            rate: String,
          },
          arbic: {
            mark: Number,
            note: String,
            rate: String,
          },
          history: {
            mark: Number,
            note: String,
            rate: String,
          },
          english: {
            mark: Number,
            note: String,
            rate: String,
          },
          science: {
            mark: Number,
            note: String,
            rate: String,
          },
        },
      },
      second: {
        subjects: {
          math: {
            mark: Number,
            note: String,
            rate: String,
          },
          arbic: {
            mark: Number,
            note: String,
            rate: String,
          },
          history: {
            mark: Number,
            note: String,
            rate: String,
          },
          english: {
            mark: Number,
            note: String,
            rate: String,
          },
          science: {
            mark: Number,
            note: String,
            rate: String,
          },
        },
      },
      final: {
        subjects: {
          math: {
            mark: Number,
            note: String,
            rate: String,
          },
          arbic: {
            mark: Number,
            note: String,
            rate: String,
          },
          history: {
            mark: Number,
            note: String,
            rate: String,
          },
          english: {
            mark: Number,
            note: String,
            rate: String,
          },
          science: {
            mark: Number,
            note: String,
            rate: String,
          },
        },
      },
      _id: false,
    },
  ],
  id: {
    type: Schema.Types.ObjectId, //this for tell database create _id for the student
  },
});

module.exports = mongoose.model("Student", StudentSchema);
