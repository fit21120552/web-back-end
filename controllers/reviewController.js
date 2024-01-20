const Review = require("./../models/reviewModel.js");
const factory = require("./../db/HandleFactory.js");

module.exports.setUserAndProduct = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.tour = req.params._id;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
