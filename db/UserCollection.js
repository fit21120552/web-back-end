const collection = require('../configs/db_connection');


module.exports =
{
    SignUp: async (username, password, email, role) => {

        try {
            const data = { username, password, email, role };
            const userdata = await collection.insertMany(data);
            return userdata;
        } catch (error) {
            throw error
        }

    },
    GetUserByName: async (name) => {
        try {
            const data = await collection.find({ username: name })
            return data;
        } catch (error) {
            throw error
        }

    },
    GetUserByEmail: async (mail) => {
        try {
            const data = await collection.find({ email: mail })
            return data;
        } catch (error) {
            throw error
        }
    },
    GetAllUser: async()=>
    {
        try {
            const data = await collection.find();
            return data;
        } catch (error) {
            throw error
        }
    },
    UpdateOneField: async (ID, namefield, newvalue) => {
        try {
            await collection.updateOne({ _id: ID },
                {
                    $set:
                    {
                        [namefield]: newvalue
                    },
                })
        } catch (error) {
            throw error;
        }

    },
    DeleteOne: async(Id)=>
    {
        try {
            console.log("id: ",Id)
            await collection.findByIdAndDelete({_id: Id});
            
        } catch (error) {
            throw error;
        }
    },
    FindOne: async(Id)=>
    {
        try {
            const data = await collection.findById(Id);
            return data;
            
        } catch (error) {
            throw error;
        }
    }
}