const router = require("express").Router();
const foodRoutes = require("./food");
const foodGroupRoutes = require("./foodgroup");
const mealRoutes = require("./meal");
const userRoutes = require("./user");

//routes
router.use("/food", foodRoutes);
 router.use("/foodgroup", foodGroupRoutes);
router.use("/meal", mealRoutes);
router.use("/user", userRoutes);

module.exports = router;
