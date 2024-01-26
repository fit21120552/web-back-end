const FileUtility = require('../utils/FileUtility')
const fs = require('fs')
module.exports = {
    getProductImage: async (req, res, next)=> {
        try {
            console.log('url: ',req.query)
            const { id, path } = req.query
            const imageFile = fs.readFileSync(`uploads/products/${id}/${path}`);
            // Set the appropriate content type header
            res.setHeader('Content-Type', 'image/jpeg');

            // Send the image data as the response
           res.send(imageFile);        

        } catch (error) {
            next(error)
        }
    },
    getUserImage: async (req, res, next) => {
        try {
            const { id, path } = req.query
            const imageFile = fs.readFileSync(`uploads/users/${id}/${path}`);
            // Set the appropriate content type header
            res.setHeader('Content-Type', 'image/jpeg');

            // Send the image data as the response
           res.send(imageFile);
        } catch (error) {
            next(error)
        }
    }
    
}