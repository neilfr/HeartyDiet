const db = require("../models");
var mongoose = require("mongoose");

// Defining methods for the dailyPlanController
module.exports = {
  findAll: function(req, res) {
    db.DailyPlan.find(req.query)
      .sort({ dailyPlanName: 1 })
      // .then(dbModel => res.json(dbModel))
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },
  //! 2 new functions
  addMealById: function(req, res) {
    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      {
        $push: { mealList: req.params.mealId }
        // ,
        // totalEnergy: 50,
        // totalPotassium: 50
      },
      { new: true }
    )
      .populate("mealList")
      .exec(function(err, found1) {
        console.log("found1 is:", found1);
        res.json(found1);
      });
  },
  removeMealById: function(req, res) {
    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      {
        $pullAll: { foodList: [new mongoose.Types.ObjectId(req.params.foodId)] }
      },
      { new: true }
    )
      .populate("foodList")
      .exec(function(err, found) {
        res.json(found);
      });
  },
  updateKCalTotals: function(req, res) {
    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      { $set: req.body },
      { new: true }
    )
      //   .populate("foodList.food") // changed from foodList to foodList.food
      .exec(function(err, found) {
        console.log(found, err);
        res.json(found);
      });
  },

  findById: function(req, res) {
    db.DailyPlan.findById(req.params.id)
      .populate("foodList")
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.DailyPlan.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  update: function(req, res) {
    db.DailyPlan.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => {
        console.error(err);
        res.json(err);
      });
  },
  // remove: function(req, res) {
  //   db.DailyPlan.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  //   findByUser: function(req, res) {
  //     db.DailyPlan.find({
  //       userName: req.params.userName
  //     })
  //       .sort({ dailyPlanName: 1 })
  //       //!new lines to include all the related food list data for each of the dailyPlans
  //       // .populate("foodList")
  //       .exec(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }

  findByUser: function(req, res) {
    db.DailyPlan.find({
      userName: req.params.userName
    })
      // .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  }
};
