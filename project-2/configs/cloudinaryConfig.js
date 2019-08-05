// Init cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djm7zwedb',
    api_key: '594474879943283',
    api_secret: '6XmOade6QqkIjLT2T1gPUUDaoII'
});

exports.uploads = (file) =>{return new Promise(resolve => {cloudinary.uploader.upload(file, (result) =>{resolve({url: result.url, id: result.public_id})}, {resource_type: "auto"})})}
