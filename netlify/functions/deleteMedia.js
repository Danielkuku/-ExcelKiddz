const cloudinary = require("cloudinary").v2;
const admin = require("firebase-admin");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  try {
    const { publicId, docId } = JSON.parse(event.body);

    if (!publicId || !docId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing publicId or docId" }),
      };
    }

    // 🔥 DELETE FROM CLOUDINARY (IMAGE FIRST, THEN VIDEO)
    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result === "not found") {
      result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
    }

    if (result.result !== "ok") {
      throw new Error("Cloudinary delete failed");
    }

    // 🔥 DELETE FROM FIRESTORE
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
