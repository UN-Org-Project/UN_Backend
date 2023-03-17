const bcrypt = require("bcryptjs");
const Parent = require("../models/parent");

exports.getAllParents = (req, res) => {
  Parent.find({})
    .then((dbParents) => {
      res.json(dbParents);
    })
    .catch((err) => {
      res.json(err);
    });
};

// exports.postCreatParent = (req, res) => {

//   const name = req.body.name;
//   const userName = req.body.userName;
//   const password = req.body.password;
//   const emailAdress = req.body.emailAdress;
//   const telepohoneNumber = req.body.telepohoneNumber;
//   const numberOfChildren = req.body.numberOfChildren;
//   const state = "Parent"

//   bcrypt
//     .hash(password, 12)
//     .then(hashedPw => {
//       const parent = new Parent({
//         name: name,
//         userName: userName,
//         password: hashedPw,
//         emailAdress: emailAdress,
//         telepohoneNumber: telepohoneNumber,
//         numberOfChildren: numberOfChildren,
//         state: state
//       });
//       return parent.save();
//     })
//     .then(result => {
//       res.status(201).json({ message: 'Parent created!', parentId: result._id });
//     })

// };

exports.getNumberOfAllParents = (req, res) => {
  Parent.find({})
    .then((dbParents) => {
      return res.json(dbParents.length);
    })
    .catch((err) => {
      res.json(err);
    });
};
