import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";

const ContactPageComplete = () => {
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setContactInfoVisible(true);
        }
      });
    }, observerOptions);

    if (contactInfoRef.current) {
      observer.observe(contactInfoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function Contact() {
    return (
      <div>
        <section className="contact-hero">
          <div className="hero-placeholder">
            <span>
              <img src="/lol.jpg" alt="Contact banner" loading="lazy" />
            </span>
          </div>
          {/* <h1 className="contact-title">Contact</h1> */}
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-container">
            <div className="form-left">
              <p className="form-subtitle">Get In Touch!</p>
              <h2 className="form-heading">We Would Love to Hear from You!</h2>
              <p className="form-description">
                Please contact us, we will answer your query within one business
                day,
              </p>
              <div className="contact-detail">
                <span className="contact-icon">📞</span>
                <span>07426119821</span>
              </div>
              <div className="contact-detail">
                <span className="contact-icon">✉️</span>
                <span>info@excelkiddzchildminding.co.uk</span>
              </div>
              <div className="contact-detail">
                <span className="contact-icon">📍</span>
                <span>
                  20 Danson Street, Miles Platting, Manchester, M40 7LQ
                </span>
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Your Message </label>
                <textarea className="form-textarea"></textarea>
              </div>
              <button className="submit-button">Submit</button>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section
          ref={contactInfoRef}
          className={`contact-info-section ${
            contactInfoVisible ? "visible" : ""
          }`}
        >
          <p className="info-label">HOW TO REACH US</p>
          <h2 className="info-heading">Contact Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>Opening Hour</h3>
              <p>Monday - Friday</p>
              <p>7:30AM - 18:00PM</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Office Phone Number</h3>
              <p>
                <a href="tel:07426119821" className="contact-tel">
                  07426119821
                </a>
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Office Location</h3>
              <p>
                20 Danson Street, Miles Platting,
                <br />
                Manchester M40 7LQ
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </div>
    );
  }

  // ✅ This line fixes it:
  return <Contact />;
};

export default ContactPageComplete;
