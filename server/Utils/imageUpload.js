// const {uploader} =require('cloudinary')
const cloudinary=require('cloudinary').v2

cloudinary.config(
  {
      cloud_name:process.env.cloud_name,
      api_key:process.env.api_key,
      api_secret:process.env.api_secret,
  }
)
exports.uploadToCloudinary = (imageBuffer) => {
    return new Promise((resolve, reject) => {
       cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          reject(new ErrorHandler("Error Uploading", 400));
        } else {
          // Cloudinary returns the uploaded image URL in the result
          const imageUrl = result.secure_url;
          resolve(imageUrl);
        }
      }).end(imageBuffer); // Upload the processed image buffer
    });
  };