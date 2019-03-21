const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  //mealName: any friendly string the user wants to use to refer to this collection of foods IE. meal
  mealName: { type: String, required: false },
  foodList: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Food"
      },
      foodName: {
        type: String
      },
      servingSize: {
        type: Number
      }
    }
  ],
  userName: { type: String, required: false }
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
