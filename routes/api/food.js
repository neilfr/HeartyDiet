const router = require("express").Router();
const foodController = require("../../controllers/foodController");

// Matches with "/api/food"
router
  .route("/")
  .get(foodController.findAll)
  .post(foodController.create);

// Matches with "/api/food/:id"
router
  .route("/foodByID/:id")
  .get(foodController.findById)
  .put(foodController.update)
  .delete(foodController.remove);

router
  .route("/foodByFoodGroupName/:foodGroupName")
  .get(foodController.findByFoodGroupName)
  .post(foodController.create);

router
  .route("/foodByFoodGroupNameAndUser/:foodGroupName/:userName")
  .get(foodController.findByFoodGroupNameAndUser);

router
  .route("/foodByUser/:userName")
  .post(foodController.create)
  .get(foodController.findByUser);

module.exports = router;