import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import UploadPage from "./pages/UploadPage";
import Gallery from "./pages/Gallery";

function App() {
  const [media, setMedia] = useState([]);

  // ✅ persist media so refresh doesn’t wipe it
  useEffect(() => {
    const stored = localStorage.getItem("media");
    if (stored) {
      setMedia(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("media", JSON.stringify(media));
  }, [media]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/upload"
          element={<UploadPage media={media} setMedia={setMedia} />}
        />
        <Route path="/gallery" element={<Gallery media={media} />} />
      </Routes>
    </>
  );
}

export default App;
