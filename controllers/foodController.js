const db = require("../models");

//included res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
//to enable virtual fields in Mongoose.  Documentation: https://mongoosejs.com/docs/guide.html#virtuals

// Defining methods for the foodController
module.exports = {
  findAll: function(req, res) {
    db.Food.find(req.query)
      .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
  //   // db.Food.findById(req.params.id)
  //   db.Food.find({ _id: req.params.id })
  //     // .then(dbModel => res.json(dbModel))
  //     // .then(dbModel =>
  //     //   res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
  //     // )
  //     .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
  //     .catch(err => res.status(422).json(err));
  // },

  findById: function(req, res) {
    db.Food.findById(req.params.id)
      //.populate("foodList")
      // .then(dbModel => res.json(dbModel))
      .then(dbModel => res.json(dbModel.toJSON({ virtuals: true })))
      .catch(err => res.status(422).json(err));
  },

  findByFoodName: function(req, res) {
    // db.Food.findById(req.params.id)
    db.Food.find({ foodName: { $regex: new RegExp(req.params.foodName, "i") } })
      // .then(dbModel => res.json(dbModel))
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },
  findByFoodGroupName: function(req, res) {
    db.Food.find({ foodGroupName: req.params.foodGroupName })
      .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => {
        res.status(422).json(err);
        console.log(err);
      });
  },
  findByFoodGroupNameAndUser: function(req, res) {
    db.Food.find({
      foodGroupName: req.params.foodGroupName,
      userName: req.params.userName
    })
      .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
      .catch(err => res.status(422).json(err));
  },

  findByUser: function(req, res) {
    db.Food.find({
      userName: req.params.userName
    })
      .sort({ foodName: 1 })
      .then(dbModel =>
        res.json(dbModel.map(model => model.toJSON({ virtuals: true })))
      )
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
