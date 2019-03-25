const mongoose = require("mongoose");
const db = require("../models");
const foodData = require("./food.json");
const userData = require("./user.json");
const foodGroupData = require("./foodGroup.json");
const dailyPlanData = require("./dailyPlan.json");
const scheduleData = require("./schedule.json");

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

const foodGroupSeed = foodGroupData.map(x => {
  delete x._id;
  return x;
});

const dailyPlanSeed = dailyPlanData.map(x => {
  delete x._id;
  return x;
});

const scheduleSeed = scheduleData.map(x => {
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

// const User_Insert = db.User.remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " user records inserted!");
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

const Foodgroup_Insert = db.FoodGroup.remove({})
  .then(() => db.FoodGroup.collection.insertMany(foodGroupSeed))
  .then(data => {
    console.log(data.result.n + " food group records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const DailyPlan_Insert = db.DailyPlan.remove({})
  .then(() => db.DailyPlan.collection.insertMany(dailyPlanSeed))
  .then(data => {
    console.log(data.result.n + " daily plan records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const Schedule_Insert = db.Schedule.remove({})
  .then(() => db.Schedule.collection.insertMany(scheduleSeed))
  .then(data => {
    console.log(data.result.n + " schedule records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

Promise.all([
  Food_Insert,
  // User_Insert,
  Foodgroup_Insert,
  DailyPlan_Insert,
  Schedule_Insert
]).then(function() {
  console.log("all seeds loaded!!");
  process.exit(0);
});
