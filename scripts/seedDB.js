const mongoose = require("mongoose");
const db = require("../models");
const foodData = require("./food.json");
const userData = require("./user.json");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heartydiet");

const foodSeed = foodData.map(x => {
  delete x._id;
  return x;
});

const userSeed = userData.map(x => {
  delete x._id;
  return x;
});

console.log(foodSeed.length, foodSeed[0]);

db.Food.remove({})
  .then(() => db.Food.collection.insertMany(foodSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
