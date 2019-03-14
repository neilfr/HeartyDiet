const db = require("../models");

// Defining methods for the foodController
module.exports = {
  findAll: function(req, res) {
    db.Food.find(req.query)
      .sort({ foodName: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findDistinct: function(req, res) {
    // db.Food.distinct("foodGroup")
    //db.Food.distinct(req.query)
    //db.runCommand({ distinct: "heartydiet.Food", key: "foodGroup" })
    db.Food.find(req.query)
      .sort({ foodGroup: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Food.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Food.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.Food.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Food.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
