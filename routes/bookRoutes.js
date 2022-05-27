const express = require("express");
const router = express.Router();
const bookController = require("./../controllers/bookController");
router.route("/book/:title").get(bookController.getBookDetails);
router.route("/ratingStatus/:username/:book").get(bookController.ratingCheck);
router.route("/rating/:username/:book/:rate").post(bookController.rateBook);
module.exports = router;
