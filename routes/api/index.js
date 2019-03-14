const router = require("express").Router();
const foodRoutes = require("./food");
const mealRoutes = require("./meal");
const userRoutes = require("./user");

//routes
router.use("/food", foodRoutes);
router.use("/meal", mealRoutes);
router.use("/user", userRoutes);

module.exports = router;
