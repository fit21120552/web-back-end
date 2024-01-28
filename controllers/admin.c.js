const userModel = require("../models/user.m");
const factory = require("./../db/HandleFactory");
const collection = require("./../configs/db_connection");

module.exports = {
  // get all account
  getAllAccount: factory.getAll(collection),
  //handle sign up
  Home: async (req, res, next) => {
    try {
      const data = await userModel.GetAllUser();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  DeleteUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      await userModel.DeleteUser(id);
      return res.json("success");
    } catch (error) {
      next(error);
    }
  },
  DetailUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await userModel.DetailUser(id);
      if (data != undefined) {
        return res.json(data);
      }
      return res.json("Not exist user !");
    } catch (error) {
      next(error);
    }
  },
};
