const router = require("express").Router();
const dailyPlanController = require("../../controllers/dailyPlanController");

// Matches with "/api/dailyPlan"
router
  .route("/")
  .get(dailyPlanController.findAll)
  .post(dailyPlanController.create);

// Matches with "/api/dailyPlan/:id"
router
  .route("/:id")
  .get(dailyPlanController.findById)
  .put(dailyPlanController.update)
  .delete(dailyPlanController.remove);

// .post(dailyPlanController.addFoodById)
// .delete(dailyPlanController.remove);

//just added
router
  .route("/dailyPlanByUser/:userName")
  .post(dailyPlanController.create)
  .get(dailyPlanController.findByUser);

router
  .route("/meal/:dailyPlanId/:mealId")
  .delete(dailyPlanController.removeMealById)
  .post(dailyPlanController.addMealById);

router
  .route("/KCalTotals/:dailyPlanId")
  .put(dailyPlanController.updateKCalTotals);

module.exports = router;
