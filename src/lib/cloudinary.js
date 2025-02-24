import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "dc-images",
  });
  return result.secure_url;
}

export async function uploadCsv(csvFile) {
  const csvData = await csvFile.arrayBuffer();
  const base64Data = Buffer.from(csvData).toString("base64");
  const mime = csvFile.type || "text/csv";
  const fileUri = `data:${mime};base64,${base64Data}`;

  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "dc-csv-uploads",
    resource_type: "raw",
    format: "csv", // Specify the file format explicitly
  });

  return result.secure_url;
}
