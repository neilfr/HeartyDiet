const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  scheduleDate: { type: Date, required: false },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  totalEnergy: { type: Number, required: false },
  totalPotassium: { type: Number, required: false },
  dailyPlanID: {
    type: Schema.Types.ObjectId,
    ref: "DailyPlan",
    required: false
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
