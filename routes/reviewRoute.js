const express = require("express");
const reviewController = require("./../controllers/reviewController");
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewController.getAllReview)
  .post(reviewController.setUserAndProduct, reviewController.createReview);

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;
