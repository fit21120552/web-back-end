const mongoose = require("mongoose");
const SessionModel = mongoose.connection.collection("sessions");
module.exports = 
{
    GetOneSession : async(sessionID) =>
    {
        try {
            const result =  await SessionModel.findOne({ _id: sessionID });;
            return result;
        } catch (error) {
            throw error;
        }
      
    }
}