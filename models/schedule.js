const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  date: { type: Date, required: true },
  dailyPlanId: { type: Schema.Types.ObjectId, ref: "DailyPlan" },
  userName: { type: String, required: true }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
