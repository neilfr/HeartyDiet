const router = require("express").Router();
const foodGroupController = require("../../controllers/foodGroupController");

// Matches with "/api/food"
router
  .route("/")
  .get(foodGroupController.findDistinct)
  .post(foodGroupController.create);

// Matches with "/api/food/:id"
router
  .route("/:id")
  .get(foodGroupController.findById)
  .put(foodGroupController.update)
  .delete(foodGroupController.remove);

router
  .route("/foodGroupByMasterAndUser/:userName")
  .get(foodGroupController.findByMasterAndUser)
  .put(foodGroupController.update)
  .delete(foodGroupController.remove);

module.exports = router;
