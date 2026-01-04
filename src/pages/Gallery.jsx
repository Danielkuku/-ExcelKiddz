import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

export default function Gallery() {
  const [media, setMedia] = useState([]);

  // 🔥 REAL-TIME LISTENER (GALLERY PAGE)
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

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>Growing, Learning, and Creating Memories</h1>
        <p>
          Every picture and video here tells a story of learning, care, and
          development. This gallery highlights the experiences that shape kids
          and reflects our commitment to providing a supportive and engaging
          environment.
        </p>
      </div>

      <div className="media-grid">
        {media.map((item) => (
          <div key={item.id} className="media-card">
            {item.type === "image" ? (
              <img src={item.url} alt="" />
            ) : (
              <video src={item.url} controls />
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
