const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: { type: String, required: false },
  userName: { type: String, required: false },
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

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
