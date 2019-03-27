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
    console.log("inside AddMealById and");
    console.log("DAILYPLAN ID IS:", req.params.dailyPlanId);
    console.log("MEAL ID IS: ", req.params.mealId);

    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      {
        $push: {
          mealList: {
            meal: req.params.mealId
          }
        }
        // ,
        // totalEnergy: 50,
        // totalPotassium: 50
      },
      { new: true }
    )
      .populate("mealList.meal")
      .exec()
      .then(dbModel => {
        console.log(dbModel);
        dbModel.mealList = dbModel.mealList.map(model =>
          model.toJSON({ virtuals: true })
        );
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => {
        res.json(err);
      });
  },
  // removeMealById: function(req, res) {
  //   db.DailyPlan.findByIdAndUpdate(
  //     req.params.dailyPlanId,
  //     {
  //       $pullAll: { foodList: [new mongoose.Types.ObjectId(req.params.foodId)] }
  //     },
  //     { new: true }
  //   )
  //     .populate("foodList")
  //     .exec(function(err, found) {
  //       res.json(found);
  //     });
  // },

  removeMealById: function(req, res) {
    console.log("req.params.dailyPlanId is:", req.params.dailyPlanId);
    console.log("req.params.mealId is:", req.params.mealId);
    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      {
        $pull: {
          mealList: { _id: new mongoose.Types.ObjectId(req.params.mealId) }
          // foodList: [req.params.foodId]
        }
      },
      { new: true }
    )
      .populate("mealList")
      .exec()
      .then(dbModel => {
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => console.log(err));
  },

  updateKCalTotals: function(req, res) {
    db.DailyPlan.findByIdAndUpdate(
      req.params.dailyPlanId,
      { $set: req.body },
      { new: true }
    )
      .populate("mealList.meal") // changed from foodList to foodList.food
      // .exec(function(err, found) {
      //   console.log(found, err);
      //   res.json(found);
      // });
      .exec()
      .then(dbModel => {
        console.log("UPDATEKCALTOTALS DBMODEL IS:", dbModel);
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => console.log(err));
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
  remove: function(req, res) {
    db.DailyPlan.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => res.status(422).json(err));
  },

  //   findByUser: function(req, res) {
  //     db.DailyPlan.find({
  //       userID: req.params.userID
  //     })
  //       .sort({ dailyPlanName: 1 })
  //       //!new lines to include all the related food list data for each of the dailyPlans
  //       // .populate("foodList")
  //       .exec(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }

  findByUser: function(req, res) {
    db.DailyPlan.find({
      userID: req.params.userID
    })
      // .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  }
};
