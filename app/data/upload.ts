import { NextApiResponse, NextApiRequest } from "next";
import formidable, { File } from "formidable";
import cloudinary from "cloudinary";
import fs from "fs";

export const config = {
    api: { bodyParser: false },
};

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const parseForm = (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};


//UPLOAD GAMBAR KE CLOUDINARY
export const uploadImage = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { files } = await parseForm(req);

        const image = files.image;

        if (!image) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const file = Array.isArray(image) ? image[0] : image;
        const typedFile = file as File;

        const filePath = typedFile.filepath;

        if (!filePath) {
            return res.status(500).json({ message: "File path not found" });
        }

        // Upload ke Cloudinary
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: "news",
            resource_type: "auto", // bisa image / pdf
        });

        return res.status(200).json({
            secure_url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error: any) {
        console.error("Upload error:", error);
        return res.status(500).json({ message: error.message });
    }
};

export default uploadImage;


//UPLOAD PDF
export const uploadPDF = async ( req: NextApiRequest, res: NextApiResponse ) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { files } = await parseForm(req);

        const pdf = files.pdf;
        if (!pdf) {
            return res.status(500).json({ message: "File path not found" });
        }
    }
}