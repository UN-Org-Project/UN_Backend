const mongoose = require("mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const parentRoutes = require("./routes/parent");
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");

//connecting to database
const MONGODB_URI =
  "mongodb+srv://yaseen:20203302@usermanagement.2r3p529.mongodb.net/Parents_Studnts";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // its important to Thunder Client done

// Midlwares
app.use(parentRoutes);
app.use(teacherRoutes);
app.use(studentRoutes);

//listen
mongoose
  .connect(MONGODB_URI)
  .then(console.log("Database Connected!"))
  .then((result) => {
    app.listen(3000, () => {
      console.log("The server is listing on ", 3000, "now");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////////////////////////////////////////////
// // Publisher Schema
// const publisherSchema = new mongoose.Schema({
//   companyName: String,
//   firstParty: Boolean,
//   website: String
// })

// // Publisher Model
// const Publisher = mongoose.model('Publisher', publisherSchema);

// // Game Schema
// const gameSchema = new mongoose.Schema({
//   title: String,
//   publisher: publisherSchema
// })

// // Game Model
// const Game = mongoose.model('Game', gameSchema);

// app.get('/',(req, res)=> {
//   async function createGame(title, publisher) {
//     const game = new Game({
//         title,
//         publisher
//     });

//     const result = await game.save();
//     console.log(result);
//   }
//   createGame('Rayman', new Publisher({
//      companyName: 'Ubisoft',
//       firstParty: false,
//        website: 'https://www.ubisoft.com/'
//       }))
// })

//////////////////////////////////////////////////////////////////////
