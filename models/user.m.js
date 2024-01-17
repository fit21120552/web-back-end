const userDB = require('../db/UserCollection');

module.exports = 
{
    register : async(username,password,email,role) =>
    {
       const result =  await userDB.SignUp(username,password,email,role);
       return result;
    },

    GetUser: async(name)=>
    {
        const result = await userDB.GetUserByName(name);
        return result[0];
    }
}