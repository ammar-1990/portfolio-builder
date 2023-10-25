import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    api_key:process.env.CLOUDINARY_API_ID,
    api_secret:process.env.CLOUDINARY_API_SECRET

  })


export const deleteImage = (src:string)=>{
    const publicId = src.split('/').pop()?.split('.')
    console.log(publicId)
}