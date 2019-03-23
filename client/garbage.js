const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  mealName: { type: String, required: false },
  userName: { type: String, required: false },
  foodList: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Food"
      },
      servingSize: { type: Number }
    }
  ]
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
