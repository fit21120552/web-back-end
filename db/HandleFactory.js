const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("./../utils/APIFeatures");
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("no document that found id ", 404));
    }
    res.status(204).json({
      status: "success",
      message: "delete success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(doc);
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError("no document that found id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    let query = Model.find(filter);
    if (popOptions) query = query.populate(popOptions);
    // EXECUTE QUERY
    const features = new APIFeatures(query, req.query).filter().sort().fields().pagination(Model);
    const doc = await features;
    const data = await doc.query;
    const result = data.length;
    const totalPages = Math.ceil(doc.query.totalPages);
    // SEND RESPONSE`
    if (result === 0) {
      return next(new AppError("no document that found", 404));
    }
    res.status(200).json({
      status: "success",
      result: data.length,
      totalPages: totalPages,
      data: {
        data: data,
      },
    });
  });
