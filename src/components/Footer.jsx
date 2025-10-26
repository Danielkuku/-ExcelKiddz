import { FaFacebookF } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    } else {
      // Already on the same page — scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/icon_logo.png" alt="" />
          </div>
          <p className="footer-tagline">Learn | Share | Grow</p>
          <a
            href="https://web.facebook.com/Damilolar00?_rdc=1&_rdr#"
            className="footer-sociall"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        </div>

        <div className="footer-column">
          <h3>Quick Navigation</h3>
          <ul className="footer-links">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/");
                }}
                className="footer-link"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/terms");
                }}
                className="footer-link"
              >
                Terms & Condition
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/contact");
                }}
                className="footer-link"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Our Office</h3>
          <div className="footer-address">
            20 Danson Street,
            <br />
            Miles Platting,
            <br />
            Manchester.
            <br />
            M40 7LQ.
          </div>
        </div>
      </div>

      <div className="footer-badges">
        <div className="badge-placeholder">
          <img src="/footer image.jpg" alt="" />
        </div>
      </div>

      <div className="footer-copyright">&copy; 2025 ExcelKiddz</div>
    </footer>
  );
}

export default Footer;
