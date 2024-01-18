const collection = require('../configs/db_connection');


module.exports =
{
    SignUp: async(username,password,email,role)=>
    {
        const data = {username,password,email,role};
        const userdata = await collection.insertMany(data);
        return userdata;
    },
    GetUserByName: async(name)=>
    {
        const data = await collection.find({username: name})
        return data;
    },
    UpdateOneField: async(Username,namefield,newvalue)=>
    {
        await collection.updateOne({ username: Username},
            {
                $set:
                {
                    [namefield]: newvalue
                },
            })
    }
}