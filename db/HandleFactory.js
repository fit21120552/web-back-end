const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("./../utils/APIFeatures");
const FileUtility = require("../utils/FileUtility")

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("delete id: ",req.params.id)
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      console.log("not found")
      return next(new AppError("no document that found id ", 404));
    }
   // console.log(" found")
    res.status(204).json({
      status: "success",
      message: "delete success",
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log('data: ',req.params.id, req.body)
    if (req.file) {
      if (req.file.fieldname==="thumbnail") {
          req.body.thumbnail = req.file.filename
      } else if  (req.file.fieldname==="avatar") {
          req.body.avatar = req.file.filename
      }
      
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (doc && req.file) {
      if (req.file.fieldname==="thumbnail") { //image of product
        let destinationPath = `uploads/products/${doc._id}/`
        await FileUtility.createFolderIfNotExists(destinationPath) //create folder for product's image
        // move image to new folder
        await FileUtility.moveImageFile(req.file.path, destinationPath + req.file.filename,(err) => {
          if (err) {
              console.error(err);
              console.log('Failed to move the image file')
             
          }}) 
      } else if (req.file.fieldname==="avatar") { //image of user
        let destinationPath = `uploads/users/${doc._id}/`
        await FileUtility.createFolderIfNotExists(destinationPath) //create folder for user's image
        // move image to new folder
        await FileUtility.moveImageFile(req.file.path, destinationPath + req.file.filename,(err) => {
          if (err) {
              console.error(err);
              console.log('Failed to move the image file')
             
          }}) 
      }
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    //console.log("req:",req)
    console.log("req.file: ",req.file)
    if (req.file) {
      if (req.file.fieldname==="thumbnail") {
          req.body.thumbnail = req.file.filename
      } else if  (req.file.fieldname==="avatar") {
          req.body.avatar = req.file.filename
      }
      
    }
    const doc = await Model.create(req.body);
    console.log("doc: ",doc)
    if (doc && req.file) {
      if (req.file.fieldname==="thumbnail") { //image of product
        let destinationPath = `uploads/products/${doc._id}/`
        await FileUtility.createFolderIfNotExists(destinationPath) //create folder for product's image
        // move image to new folder
        await FileUtility.moveImageFile(req.file.path, destinationPath + req.file.filename,(err) => {
          if (err) {
              console.error(err);
              console.log('Failed to move the image file')
             
          }}) 
      } else if (req.file.fieldname==="avatar") { //image of user
        let destinationPath = `uploads/users/${doc._id}/`
        await FileUtility.createFolderIfNotExists(destinationPath) //create folder for user's image
        // move image to new folder
        await FileUtility.moveImageFile(req.file.path, destinationPath + req.file.filename,(err) => {
          if (err) {
              console.error(err);
              console.log('Failed to move the image file')
             
          }}) 
      }
    }
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
