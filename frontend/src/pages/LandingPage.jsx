import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../styles/LandingPage.css"; // ✅ This line adds your styling

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-buttons">
        <Link to="/register">
  <button className="get-started-btn">Get Started</button>
</Link>
          <Link to="/register">
  <button className="login-btn">Log in</button>
</Link>
        </div>
      </nav>

      <div className="hero-section">
        <h1>
          Build Your Resume <span>With AI</span>
        </h1>
        <p>
          Effortlessly Craft a Professional Resume with Our AI-Powered Builder
        </p>
        <div className="cta-buttons">
        <button className="get-started-btn" onClick={() => navigate('/register')}>
            Get Started
          </button>
          <button className="learn-more-btn">Learn more</button>
        </div>
      </div>

      <div className="cards-section">
        <div className="card">
          <h3>Create Your Template</h3>
          <p>Select color scheme and resume template for a clean layout.</p>
        </div>
        <div className="card">
          <h3>Update Your Information</h3>
          <p>Fill in details, experience, and AI will help you optimize.</p>
        </div>
        <div className="card">
          <h3>Share Your Resume</h3>
          <p>Download or share the resume link with employers.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
