import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  FaTree,
  FaBookOpen,
  FaPaintBrush,
  FaMusic,
  FaFacebookF,
  FaUserCircle,
} from "react-icons/fa";

const Home = () => {
  // React Hooks
  const navigate = useNavigate();

  const [aboutVisible, setAboutVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [pickupVisible, setPickupVisible] = useState(false);
  const [flexibleVisible, setFlexibleVisible] = useState(false);

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const pickupRef = useRef(null);
  const flexibleRef = useRef(null);

  // ✅ Go to Contact Page
  const handleContactClick = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Testimonials Section Logic
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = [
    {
      name: "Mrs. Shola Osoba",
      text: "We cannot recommend Excel kiddz Child Minding enough. Timi was with Excel kiddz Child Minding from 6 months to 15 months and only left due to his dad's relocation for work. It was a real wrench telling Excel kiddz that we had to leave as Timi, mum and dad really think she is the ideal childminder for Timi.",
    },
    {
      name: "Mr. John Smith",
      text: "Excel Kiddz has been absolutely wonderful for our daughter Sarah. The care and attention she receives is exceptional. The activities are engaging and educational. We couldn't be happier with our choice. The team is professional, caring, and truly dedicated to the children's development and wellbeing.",
    },
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // ✅ Intersection Observer Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === aboutRef.current) {
            setAboutVisible(true);
          } else if (entry.target === servicesRef.current) {
            setServicesVisible(true);
          } else if (entry.target === ctaRef.current) {
            setCtaVisible(true);
          } else if (entry.target === pickupRef.current) {
            setPickupVisible(true);
          } else if (entry.target === flexibleRef.current) {
            setFlexibleVisible(true);
          }
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    if (pickupRef.current) observer.observe(pickupRef.current);
    if (flexibleRef.current) observer.observe(flexibleRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <div className="hero-container" id="home">
        {/* Hero Content */}
        <div className="hero-content">
          <div className="content-wrapper">
            <div className="abc-container">
              <div className="abc-box a">A</div>
              <div className="abc-box b">B</div>
              <div className="abc-box c">C</div>
            </div>
            <h3 className="subtitle">AT EXCEL KIDDZ</h3>
            <h1 className="main-title">
              We Prioritize
              <br />
              <span className="highlight typing">Your Child's Safety!</span>
            </h1>

            <p className="description">
              Our environment is safe and conducive for your child, and we
              <br />
              take security very seriously while making sure your loved ones
              <br />
              enjoy the very best moment.
            </p>
            <button className="cta-button" onClick={handleContactClick}>
              Contact us →
            </button>
          </div>

          {/* Decorative bear icon */}
          <div className="bear-icon">🧸</div>
        </div>
      </div>

      {/* About Section */}
      <section
        ref={aboutRef}
        className={`about-section ${aboutVisible ? "visible" : ""}`}
      >
        <h1 className="about-h1">About Us</h1>
        <h2 className="section-title">OFSTED REGISTERED</h2>
        <div className="about-content">
          <div className="about-text">
            <h1>We Are Ofsted Registered Childminding Company.</h1>
            <p>
              We provide the following services Trips to local Parks, Garden,
              Visits to Playgroups, Indoor Toys, Walks, Library visits, Out-door
              Toys, Accepts Childcare Vouchers, Play Room.
            </p>
            <p>
              Art and Craft Activities, Quiet Play Computer, Board Games, Videos
              etc, Sand and Water Play, Bikes, secure garden, Books, Sensory
              Play.
            </p>
            <p>
              Songs and Rhymes, Creative Play, Story time, Toys, Dressing Up,
              Educational Activities, Educational Toys, Trips out
            </p>
            <div className="ofsted-badge">
              <div>
                <img src="/ofsted.webp" alt="" />
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image-placeholder">
              <img src="/image1.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className={`services-section ${servicesVisible ? "visible" : ""}`}
      >
        <h2 className="services-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <FaTree />
            </div>
            <h3>Trips to Local Parks Garden</h3>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBookOpen />
            </div>
            <h3>Story time and role play</h3>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaPaintBrush />
            </div>
            <h3>Arts & Craft Activities</h3>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaMusic />
            </div>
            <h3>Songs and Rhymes Activity</h3>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`cta-section ${ctaVisible ? "visible" : ""}`}
      >
        <div className="cta-content">
          <div className="cta-text">
            <h3 className="cta-label cta-p">WHAT WE DO</h3>
            <h2>Get The Right Care For Your Child</h2>
            <p className="cta-subtitle">
              Providing An All-Inclusive, Safe, And Caring Environment For
              Children.
            </p>
            <p>
              Our environment is secure, safe, and conducive for your lovely
              children, be rest assured that your child's safety is our number 1
              priority, that's why parents give us good recommendations, please
              don't take our words for it, try book a visit with us for
              inspections, we are sure you won't be disappointed.
            </p>
            <button className="cta-button" onClick={handleContactClick}>
              Get in touch →
            </button>
          </div>
          <div className="cta-images">
            <div className="cta-image-placeholder">
              <img src="/image 2.jpg" alt="" />
            </div>
            <div className="cta-image-placeholder">
              <img src="/image 3.jpg" alt="" />
            </div>
            <div className="cta-image-placeholder">
              <img src="/image 4.jpg" alt="" />
            </div>
            <div className="cta-image-placeholder">
              <img src="/image 5.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Pick Up Section */}
      <section
        ref={pickupRef}
        className={`pickup-section ${pickupVisible ? "visible" : ""}`}
      >
        <div className="pickup-content">
          <div className="pickup-image">
            <div className="pickup-image-placeholder">
              <img src="/image 5.jpg" alt="" />
            </div>
          </div>
          <div className="pickup-text">
            <h2>Pick Up And Drop Off</h2>
            <p>We offer pick up and drop off from the following schools;</p>
            <ul className="school-list">
              <li>Parkview Community Schools, Varley Street, Manchester.</li>
              <li>Co-op New Islington Free School, Ancoat, Manchester</li>
              <li>St. Patrick's R.C Primary School, Livesey, Manchester</li>
              <li>St. Bridgid's R.C Primary School, Manchester.</li>
              <li>St. Annes R.C Primary School, Ancoat, Manchester</li>
              <li>Moston Lane Primary School, Manchester</li>
            </ul>
            <button className="contact-button" onClick={handleContactClick}>
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Flexible Options Section */}
      <section
        ref={flexibleRef}
        className={`flexible-section ${flexibleVisible ? "visible" : ""}`}
      >
        <div className="flexible-content">
          <div className="flexible-text">
            <h2>Flexible Options For Childcare</h2>
            <p>
              We can provide very flexible hours enabling us to meet your
              families' needs, with a variety of resources suitable for all
              children. Such as board games, Art & Craft, Story time, Songs &
              Rhymes etc.
            </p>
          </div>
          <div className="flexible-image">
            <div className="flexible-image-placeholder">
              <img src="/image 6.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="testimonials-section">
        <h2 className="testimonials-title">Hear From Our Clients</h2>
        <div className="testimonial-container">
          <button className="nav-arrow" onClick={prevReview}>
            ‹
          </button>
          <div className="testimonial-content">
            <div className="avatar">
              <FaUserCircle className="user-icon" />
            </div>
            <p className="client-name">{reviews[currentReview].name}</p>
            <div className="stars">
              <span className="star full">★</span>
              <span className="star full">★</span>
              <span className="star full">★</span>
              <span className="star full">★</span>
              <span className="star half">★</span>
            </div>

            <p className="testimonial-text">{reviews[currentReview].text}</p>
          </div>
          <button className="nav-arrow" onClick={nextReview}>
            ›
          </button>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="team-title">Our Amazing Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="team-image">
              <img src="/image 8.jpg" alt="" srcset="" />
            </div>
            <h3 className="member-name">Abosede Adebayo</h3>
            <p className="member-role">Minder</p>
            <a
              href="https://web.facebook.com/Damilolar00?_rdc=1&_rdr#"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </div>
          <div className="team-member">
            <div className="team-image">
              <img src="/image 00.png" alt="" srcset="" />
            </div>
            <h3 className="member-name">Oladotun Adebayo</h3>
            <p className="member-role">Assistant</p>
            <a
              href="https://web.facebook.com/Damilolar00?_rdc=1&_rdr#"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
