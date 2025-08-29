import ImageKit from "imagekit";

import dotenv from 'dotenv';
dotenv.config()
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey :process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint :process.env.IMAGEKIT_URL_ENDPOINT
});


export async function uploadFile(file,filename) {
    return new Promise((resolve, reject) => {
        imagekit.upload(
            {
            file: file.buffer, // required
            fileName: filename, // required
            folder: "n22-social-application" // optional
        }, 
        function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
