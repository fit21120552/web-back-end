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
    GetUserByMail: async(mail)=>
    {
        try {
            const result = await userDB.GetUserByEmail(mail);
            return result[0];
        } catch (error) {
            throw error;
        }
      
    },
    UpdateOneField: async(id,namefield,newvalue)=>
    {
        try {
            await userDB.UpdateOneField(id,namefield,newvalue);
        } catch (error) {
            throw error;
        }
    },
    GetAllUser: async()=>
    {
        try {
            const result = await userDB.GetAllUser();
            return result;
        } catch (error) {
            throw error;
        }
    },
    DeleteUser: async(Id)=>
    {
        try {
            await userDB.DeleteONne(Id)
        } catch (error) {
            throw error
        }
    },
    DetailUser: async(Id)=>
    {
        try {
            const data = userDB.FindOne(Id)
            return data;
        } catch (error) {
            throw error
        }
    }
}