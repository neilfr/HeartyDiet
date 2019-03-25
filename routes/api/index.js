const router = require("express").Router();
const foodRoutes = require("./food");
const foodGroupRoutes = require("./foodgroup");
const mealRoutes = require("./meal");
const userRoutes = require("./user");
const accountRoutes = require("./account");
const dailyPlanRoutes = require("./dailyplan");
const schedule = require("./schedule");

//routes
router.use("/food", foodRoutes);
router.use("/foodgroup", foodGroupRoutes);
router.use("/meal", mealRoutes);
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/dailyplan", dailyPlanRoutes);
router.use("/schedule", schedule);

module.exports = router;
