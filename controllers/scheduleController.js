const db = require("../models");
var mongoose = require("mongoose");

// Defining methods for the ScheduleController
module.exports = {
  findAll: function(req, res) {
    db.Schedule.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //! 2 new functions
  addDailyPlanToScheduleByID: function(req, res) {
    let newScheduleData = {};
    db.Schedule.findByIdAndUpdate(
      req.params.ScheduleId,
      {
        $push: { dailyPlanList: req.params.dailyPlanId }
        // ,
        // totalEnergy: 50,
        // totalPotassium: 50
      },
      { new: true }
    )
      .populate("dailyPlanList")
      .exec(function(err, found1) {
        console.log("found1 is:", found1);
        res.json(found1);
      });
  },

  removeFoodById: function(req, res) {
    db.Schedule.findByIdAndUpdate(
      req.params.ScheduleId,
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
    db.Schedule.findByIdAndUpdate(
      req.params.ScheduleId,
      { $set: req.body },
      { new: true }
    )
      .populate("foodList")
      .exec(function(err, found) {
        res.json(found);
      });
  },

  findById: function(req, res) {
    db.Schedule.findById(req.params.id)
      .populate("foodList")
      .exec(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Schedule.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  createOrUpdate: function(req, res) {
    console.log(req.body);
    db.Schedule.update(
      { scheduleDate: req.body.scheduleDate },
      {
        scheduleDate: req.body.scheduleDate,
        userName: req.body.userName
      },
      { upsert: true }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },

  update: function(req, res) {
    db.Schedule.findOneAndUpdate(
      { scheduleDate: req.body.scheduleDate },
      { $set: req.body },
      { new: true }
    )
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => {
        console.error(err);
        res.json(err);
      });
  },
  remove: function(req, res) {
    db.Schedule.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUser: function(req, res) {
    db.Schedule.find({
      userName: req.params.userName
    })
      .sort({ scheduleDate: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },

  findDailyPlanByScheduleDate: function(req, res) {
    db.Schedule.find({
      scheduleDate: req.params.scheduleDate
    })
      .sort({ scheduleDate: 1 })
      .then(dbModel =>
        // dbModel.map(scheduleModel => {
        //   db.DailyPlan.findById(scheduleModel.dailyPlanID)
        //     .populate("foodList")
        //     .exec(dbModel => res.json(dbModel))
        //     .catch(err => res.status(422).json(err));
        // })

        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  }
};
