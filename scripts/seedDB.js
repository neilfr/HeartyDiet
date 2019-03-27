const mongoose = require("mongoose");
const db = require("../models");
const foodData = require("./food.json");
const foodGroupData = require("./foodGroup.json");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heartydiet");

const foodSeed = foodData.map(x => {
  delete x._id;
  return x;
});

const foodGroupSeed = foodGroupData.map(x => {
  delete x._id;
  return x;
});

const Food_Insert = db.Food.remove({})
  .then(() => db.Food.collection.insertMany(foodSeed))
  .then(data => {
    console.log(data.result.n + " food records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const Foodgroup_Insert = db.FoodGroup.remove({})
  .then(() => db.FoodGroup.collection.insertMany(foodGroupSeed))
  .then(data => {
    console.log(data.result.n + " food group records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

Promise.all([Food_Insert, Foodgroup_Insert]).then(function() {
  console.log("all seeds loaded!!");
  process.exit(0);
});
