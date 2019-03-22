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
  //! new line below
  .post(mealController.addFoodById)
  .delete(mealController.remove);

//just added
router
  .route("/mealByUser/:userName")
  .post(mealController.create)
  .get(mealController.findByUser);

router.route("/food/:mealId/:foodId").delete(mealController.removeFoodById);

module.exports = router;
