const Review = require("./../models/reviewModel.js");
const factory = require("./../db/HandleFactory.js");

module.exports.setUserAndProduct = (req, res, next) => {
  if (!req.body.productId) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.session.idUser;
  next();
};
exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
