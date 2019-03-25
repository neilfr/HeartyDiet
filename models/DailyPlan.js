const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyPlanSchema = new Schema({
  dailyPlanName: { type: String, required: false },
  userName: { type: String, required: false },
  totalEnergy: { type: Number, required: false },
  totalPotassium: { type: Number, required: false },
  mealList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal"
    }
  ]
});

const DailyPlan = mongoose.model("DailyPlan", dailyPlanSchema);

module.exports = DailyPlan;
