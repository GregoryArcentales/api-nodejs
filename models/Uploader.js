const cloudinary = require("cloudinary").v2;
const secrets = require("../config/secrets");

cloudinary.config(secrets.cloudinary);

module.exports = function (imagePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imagePath, function(err, result){
        if(result.secure_url){
          //console.log(result)
          return resolve(result.secure_url)
        }else{
          reject(new Error('Error with cloudinary'))
        }
    });
  });
};
