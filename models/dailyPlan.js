// bogus
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyPlanSchema = new Schema({
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

const DailyPlan = mongoose.model("DailyPlan", DailyPlanSchema);

DailyPlanSchema.virtual("efficiency").get(function() {
  return parseInt(this.totalPotassium) === 0
    ? 0
    : parseFloat(
        parseInt(this.totalEnergy) / parseInt(this.totalPotassium)
      ).toFixed(2);
});

module.exports = DailyPlan;
