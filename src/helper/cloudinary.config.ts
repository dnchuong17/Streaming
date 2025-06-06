import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME!,
    api_key: process.env.CLOUD_API_KEY!,
    api_secret: process.env.CLOUD_SECRETE_KEY!
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req: Request, file: Express.Multer.File) => {
        const allowedFormats = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
        const fileFormat = file.mimetype.split('/')[1];
        const format = allowedFormats.includes(fileFormat) ? fileFormat : 'png';

        const timestamp = Date.now();
        const baseName = file.originalname.split('.')[0];
        const public_id = `${timestamp}_${baseName}`;

        return {
            folder: 'stream',
            format,
            public_id,
        };
    }
});

export const CloudinaryUploader = multer({ storage });
