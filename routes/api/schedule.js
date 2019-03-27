const router = require("express").Router();
const scheduleController = require("../../controllers/scheduleController");

// Matches with "/api/schedule"
router
  .route("/")
  .get(scheduleController.findAll)
  // .post(scheduleController.create);

  //Create or Update uses a mongo .update method with the keyword "upsert"
  //to insert if it doesn't exist or update.
  .post(scheduleController.createOrUpdate)
  // .put(scheduleController.update);
  .put(scheduleController.createOrUpdate);

// Matches with "/api/schedule/:id"
router
  .route("/:id")
  .get(scheduleController.findById)
  .put(scheduleController.update)

  // .post(scheduleController.addFoodById)
  .delete(scheduleController.remove);

//just added
router
  .route("/scheduleByUser/:userID")
  .post(scheduleController.create)
  .get(scheduleController.findByUser);

// router
//   .route("/schedule/meal/:scheduleId/:mealId")
//   .delete(scheduleController.removeMealById)
//   .post(scheduleController.addMealById);

// router
//   .route("/KCalTotals/:scheduleId")
//   .put(scheduleController.updateKCalTotals);
router
  .route("/dailyPlanByScheduleDate/:scheduleDate")
  .get(scheduleController.findDailyPlanByScheduleDate);

module.exports = router;
