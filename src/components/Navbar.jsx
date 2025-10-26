import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeScrollLink, setActiveScrollLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveScrollLink(null);
    } else {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const servicesSection = document.getElementById("services");
        const reviewsSection = document.getElementById("reviews");

        if (reviewsSection && scrollY >= reviewsSection.offsetTop - 150) {
          setActiveScrollLink("reviews");
        } else if (
          servicesSection &&
          scrollY >= servicesSection.offsetTop - 150
        ) {
          setActiveScrollLink("services");
        } else {
          setActiveScrollLink(null);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location]);

  const handleScrollNav = (target) => {
    setActiveScrollLink(target);
    setMenuOpen(false); // close menu after click

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 600,
          offset: -80,
        });
      }, 250);
    } else {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 600,
        offset: -80,
      });
    }
  };

  const handleScrollToTop = (path) => {
    setActiveScrollLink(null);
    setMenuOpen(false); // close menu after click

    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => handleScrollToTop("/")}
        style={{ cursor: "pointer" }}
      >
        <div className="logo-placeholder">
          <img src="/icon_logo.png" alt="Logo" />
        </div>
      </div>

      {/* Menu icon (for mobile) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <span
          onClick={() => handleScrollToTop("/")}
          className={`nav-link ${
            location.pathname === "/" && !activeScrollLink ? "active" : ""
          }`}
          role="button"
        >
          HOME
        </span>

        <span
          onClick={() => handleScrollToTop("/contact")}
          className={`nav-link ${
            location.pathname === "/contact" ? "active" : ""
          }`}
          role="button"
        >
          CONTACT
        </span>

        <span
          onClick={() => handleScrollNav("services")}
          className={`nav-link ${
            activeScrollLink === "services" ? "active" : ""
          }`}
          role="button"
        >
          Our Services
        </span>

        <span
          onClick={() => handleScrollNav("reviews")}
          className={`nav-link ${
            activeScrollLink === "reviews" ? "active" : ""
          }`}
          role="button"
        >
          Reviews
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
