const userDB = require('../db/UserCollection');

module.exports = 
{
    register : async(username,password,email,role) =>
    {
        try {
            const result =  await userDB.SignUp(username,password,email,role);
            return result;
        } catch (error) {
            throw error;
        }
      
    },

    GetUser: async(name)=>
    {
        try {
            const result = await userDB.GetUserByName(name);
            return result[0];
        } catch (error) {
            throw error;
        }
      
    },
    UpdateOneField: async(username,namefield,newvalue)=>
    {
        try {
            await userDB.UpdateOneField(username,namefield,newvalue);
        } catch (error) {
            throw error;
        }
    }

}