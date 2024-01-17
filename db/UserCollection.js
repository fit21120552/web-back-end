const collection = require('../configs/db_connection');


module.exports =
{
    SignUp: async(username,password)=>
    {
        const data = {username,password};
        const userdata = await collection.insertMany(data);
    }
}