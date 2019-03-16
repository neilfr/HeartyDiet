const db = require("../models");

// Defining methods for the foodController
module.exports = {
  findAll: function(req, res) {
    db.FoodGroup.find(req.query)
      .sort({ foodGroupName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDistinct: function(req, res) {
    db.FoodGroup.find(req.query)
      .sort({ foodGroupName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByMasterAndUser: function(req, res) {
    console.log(req);
    db.FoodGroup.find({
      $or: [{ userName: "master" }, { userName: req.params.userName }]
    })
      .sort({ foodGroupName: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.FoodGroup.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.FoodGroup.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.FoodGroup.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.FoodGroup.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
