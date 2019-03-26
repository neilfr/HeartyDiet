const db = require("../models");
var mongoose = require("mongoose");

// Defining methods for the mealController
module.exports = {
  findAll: function(req, res) {
    db.Meal.find(req.query)
      .sort({ date: -1 })
      // .then(dbModel => res.json(dbModel))
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },
  //! 2 new functions
  addFoodById: function(req, res) {
    console.log("inside AddFoodById and");
    console.log("req.body should be servingSize: ", req.body);
    console.log("meal id is: ", req.params.mealId);
    console.log("food id is: ", req.params.foodId);

    // let newMealData = {};
    db.Meal.findByIdAndUpdate(
      req.params.mealId,
      {
        $push: {
          foodList: {
            food: req.params.foodId
          }
        }
        // ,
        // totalEnergy: 50,
        // totalPotassium: 50
      },
      { new: true }
    )
      .populate("foodList.food") // changed from foodList to foodList.food
      // .exec(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .exec()
      .then(dbModel => {
        //foodlist array
        console.log(dbModel);

        dbModel.foodList = dbModel.foodList.map(model =>
          model.toJSON({ virtuals: true })
        );

        //meal model
        res.json(dbModel.toJSON({ virtuals: true }));
      })

      .catch(err => {
        res.json(err);
      });
  },
  // todo fix remove with the new model
  removeFoodById: function(req, res) {
    db.Meal.findByIdAndUpdate(
      req.params.mealId,
      {
        $pull: {
          foodList: { _id: new mongoose.Types.ObjectId(req.params.foodId) }
          // foodList: [req.params.foodId]
        }
      },
      { new: true }
    )
      .populate("foodList.food") // changed from foodList to foodList.food
      .exec()
      .then(dbModel => {
        console.log("REMOVEFOODBYID DBMODEL IS:", dbModel);
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => console.log(err));
    // .exec(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
    // .catch(err => {
    //   res.json(err);
    // });
  },
  // removeFoodById: function(req, res) {
  //   db.Meal.findByIdAndUpdate(
  //     req.params.mealId,
  //     {
  //       $pullAll: {
  //         foodList: [{ _id: new mongoose.Types.ObjectId(req.params.foodId) }]
  //       }
  //     },
  //     { new: true }
  //   )
  //     .populate("foodList.food") // changed from foodList to foodList.food
  //     .exec(function(err, found) {
  //       res.json(found);
  //     });
  // },

  updateKCalTotals: function(req, res) {
    console.log("UPDATEKCALTOTALS REQ.BODY", req.body);
    db.Meal.findByIdAndUpdate(
      req.params.mealId,
      { $set: req.body },
      { new: true }
    )
      .populate("foodList.food") // changed from foodList to foodList.food
      .exec()
      .then(dbModel => {
        console.log("UPDATEKCALTOTALS DBMODEL IS:", dbModel);
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => console.log(err));
  },

  findById: function(req, res) {
    db.Meal.findById(req.params.id)
      .populate("foodList.food") // changed from foodList to foodList.food
      .exec()
      .then(dbModel => {
        console.log("FINDBYID DBMODEL IS:", dbModel);
        res.json(dbModel.toJSON({ virtuals: true }));
      })
      .catch(err => console.log(err));
  },

  create: function(req, res) {
    db.Meal.create(req.body)
      // .then(dbModel => res.json(dbModel))
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.json(err));
  },
  update: function(req, res) {
    db.Meal.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
      // .then(dbModel => {
      //   res.json(dbModel);
      // })
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => {
        res.json(err);
      });
  },
  remove: function(req, res) {
    db.Meal.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => res.status(422).json(err));
  },

  // findByUser: function(req, res) {
  //   db.Meal.find({
  //     userName: req.params.userName
  //   })
  //     .sort({ mealName: 1 })
  //     //!new lines to include all the related food list data for each of the meals

  //     //.populate("foodList.food") // changed from foodList to foodList.food

  //     .then(function(err, meals) {
  //       console.log("found in findByUser returned:", meals);

  //       meals.map(meal => {
  //         meal.toJSON({ virtuals: true }); //todo check if Chris put this in... and if so, is it still doing what he needs it to
  //       });

  //       console.log("meals before return:", meals);
  //       res.json(meals);
  //     });
  //   // .exec(dbModel =>
  //   //   res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
  //   // );
  //   // .catch(err => res.status(422).json(err));
  // }

  findByUser: function(req, res) {
    db.Meal.find({
      userName: req.params.userName
    })
      .sort({ mealName: 1 })
      .populate("foodList.food")
      .exec(function(err, meals) {
        meals = meals.map(meal => {
          meal.foodList = meal.foodList.map(food => {
            return food.toJSON({ virtuals: true });
          });
          return meal.toJSON({ virtuals: true });
        });
        res.json(meals);
      });
  }
};
