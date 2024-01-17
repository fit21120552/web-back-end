const userDB = require('../db/UserCollection');

module.exports = 
{
    register : async(username,password) =>
    {
        await userDB.SignUp(username,password);
    }
}