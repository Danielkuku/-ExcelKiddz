import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function UploadPage() {
  const [media, setMedia] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 🔥 REAL-TIME LISTENER (UPLOAD PAGE)
  useEffect(() => {
    const q = query(collection(db, "media"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMedia(items);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 CLOUDINARY UPLOAD
  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary not loaded");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dpshvjcp8",
        uploadPreset: "school_gallery_upload",
        multiple: true,
        resourceType: "auto",
        folder: "school-gallery",
        maxFileSize: 200000000, // 200MB
        clientAllowedFormats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
        sources: ["local", "camera", "url"],
        showAdvancedOptions: false,
        cropping: false,
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return;
        }

        if (result && result.event === "success") {
          const info = result.info;

          try {
            await addDoc(collection(db, "media"), {
              url: info.secure_url,
              type: info.resource_type === "video" ? "video" : "image",
              publicId: info.public_id, // ✅ CORRECT publicId
              createdAt: serverTimestamp(),
            });
          } catch (err) {
            console.error("Failed to save media:", err);
          }
        }
      }
    );
  };

  const handleDelete = async (item) => {
    try {
      await deleteDoc(doc(db, "media", item.id));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <h2>Welcome, Upload Pictures & Videos</h2>
        <p>Uploaded media will appear on the website automatically.</p>

        <button onClick={openCloudinaryWidget}>Upload Media</button>
      </div>

      <div className="media-grid">
        {media.map((item) => (
          <div key={item.id} className="media-card">
            {item.type === "image" ? (
              <img src={item.url} alt="" />
            ) : (
              <video src={item.url} controls />
            )}

            <button
              className="delete-btn"
              onClick={() => setConfirmDelete(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <div className="modal">
          <div className="modal-box">
            <p>Are you sure you want to delete this file?</p>
            <div className="modal-actions">
              <button onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button
                className="danger"
                disabled={deleting}
                onClick={() => handleDelete(confirmDelete)}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
