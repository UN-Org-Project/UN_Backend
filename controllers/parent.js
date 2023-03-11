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

exports.postCreatParent = (req, res) => {
  Parent.create(req.body)
    .then((dbParent) => {
      // If we were able to successfully create a Parent, send it back to the client
      res.json(dbParent);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
      res.json(err);
    });
};

exports.getNumberOfAllParents = (req, res) => {
  Parent.find({})
    .then((dbParents) => {
      return res.json(dbParents.length);
    })
    .catch((err) => {
      res.json(err);
    });
};


