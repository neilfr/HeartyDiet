const router = require("express").Router();
const bookRoutes = require("./food");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
