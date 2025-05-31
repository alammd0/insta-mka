import cloudinary from "../config/cloudinary";

// Accepts a browser File object (image/video) and uploads it to Cloudinary
export const uploadMedia = async (file: File): Promise<string> => {
  try {
    // 1. Read file data as ArrayBuffer (works in browser)
    const buffer = await file.arrayBuffer();

    // 2. Convert buffer to base64 string
    const base64 = Buffer.from(buffer).toString("base64");

    // 3. Create a data URL for Cloudinary
    const dataURL = `data:${file.type};base64,${base64}`;

    // 4. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURL, {
      folder: "INSTA_MKA", // Optional folder name in your Cloudinary dashboard
      resource_type: "auto", // <== Important: auto-detect image, video, etc.
    });

    // 5. Return secure_url from Cloudinary
    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload image or video");
  }
};
