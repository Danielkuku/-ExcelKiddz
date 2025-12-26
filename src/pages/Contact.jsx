import React, { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Footer from "../components/Footer";

const ContactPageComplete = () => {
  const [contactInfoVisible, setContactInfoVisible] = useState(false);
  const contactInfoRef = useRef(null);

  const [state, handleSubmit] = useForm("xregbbwb");

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
        {/* Hero */}
        <section className="contact-hero">
          <div className="hero-placeholder">
            <span>
              <img src="/lol.jpg" alt="Contact banner" loading="lazy" />
            </span>
          </div>
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
                <a href="tel:07426119821" className="contact-tel">
                  07426119821
                </a>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">✉️</span>
                <a
                  href="mailto:info@excelkiddzchildminding.com"
                  className="contact-email"
                >
                  info@excelkiddzchildminding.com
                </a>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">📍</span>
                <span>
                  20 Danson Street, Miles Platting, Manchester, M40 7LQ
                </span>
              </div>
            </div>

            {/* ✅ FORM (UNCHANGED STRUCTURE & STYLES) */}
            <form onSubmit={handleSubmit} className="form-right">
              {/* ✅ SUCCESS MESSAGE */}
              {state.succeeded && (
                <div className="form-success">
                  <strong>Success!</strong> Your message has been sent. We’ll
                  get back to you shortly.
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>

              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Message"
              />

              <button
                type="submit"
                className="submit-button"
                disabled={state.submitting}
              >
                Submit
              </button>
            </form>
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
              <a href="tel:07426119821" className="contact-tel">
                07426119821
              </a>
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

        <Footer />
      </div>
    );
  }

  return <Contact />;
};

export default ContactPageComplete;
