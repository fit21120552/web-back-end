
module.exports =
{
    //handle sign up
    Home: async (req, res) => {
        try {
            return res.json("home page admin");
        }
        catch (error) {
            next(error);
        }

    },
}
