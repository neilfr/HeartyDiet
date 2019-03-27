const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema({
  mealName: { type: String, required: false },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  totalEnergy: { type: Number, required: false },
  totalPotassium: { type: Number, required: false },
  foodList: [
    {
      food: {
        type: Schema.Types.ObjectId,
        ref: "Food"
      },
      servingSize: {
        type: Number,
        default: 100
      }
    }
  ]
});

const Meal = mongoose.model("Meal", MealSchema);

MealSchema.virtual("efficiency").get(function() {
  return parseInt(this.totalPotassium) === 0
    ? 0
    : parseFloat(
        parseInt(this.totalEnergy) / parseInt(this.totalPotassium)
      ).toFixed(2);
});

module.exports = Meal;
