const router = require("express").Router();
const mealController = require("../../controllers/mealController");

// Matches with "/api/meal"
router
  .route("/")
  .get(mealController.findAll)
  .post(mealController.create);

// Matches with "/api/meal/:id"
router
  .route("/:id")
  .get(mealController.findById)
  .put(mealController.update)

  // .post(mealController.addFoodById)
  .delete(mealController.remove);

router.route("/mealByID/:id").get(mealController.findById2);

//just added
router
  .route("/mealByUser/:userName")
  .post(mealController.create)
  .get(mealController.findByUser);

router
  .route("/food/:mealId/:foodId")
  .delete(mealController.removeFoodById)
  .post(mealController.addFoodById);

router.route("/KCalTotals/:mealId").put(mealController.updateKCalTotals);
module.exports = router;
