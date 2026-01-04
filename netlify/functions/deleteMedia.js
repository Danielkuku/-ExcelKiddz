const cloudinary = require("cloudinary").v2;
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  try {
    let { publicId, docId } = JSON.parse(event.body);

    // 🔥 SAFETY: remove file extension if present
    publicId = publicId.replace(/\.[^/.]+$/, "");

    if (!publicId || !docId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing publicId or docId" }),
      };
    }

    console.log("DELETE REQUEST RECEIVED");
    console.log("Public ID received:", publicId);

    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log("Image delete result:", result);

    if (result.result === "not found") {
      result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
      console.log("Video delete result:", result);
    }

    if (result.result !== "ok") {
      console.error("Cloudinary delete FAILED");
      throw new Error("Cloudinary delete failed");
    }

    console.log("Cloudinary delete SUCCESS");

    await db.collection("media").doc(docId).delete();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
