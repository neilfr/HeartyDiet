const db = require("../models");

// Defining methods for the mealController
module.exports = {
  findAll: function(req, res) {
    db.Meal.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Meal.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Meal.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Meal.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Meal.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUser: function(req, res) {
    db.Meal.find({
      userName: req.params.userName
    })
      .sort({ mealName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  }
};
