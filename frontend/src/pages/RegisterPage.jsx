import React, { useState } from "react";
import "../styles/RegisterPage.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Signup
        await axios.post("http://localhost:5000/api/auth/register", formData, {
          withCredentials: true,
        });
        console.log("✅ Signup success");
      } else {
        // Login
        await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );
        console.log("✅ Login success");
      }

      // 🔥 Redirect to dashboard after login/signup
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Auth failed", err);
      alert("Something went wrong. Check your credentials.");
    }
  };

  return (
    <div className="register-container">
      <img src={logo} alt="Logo" className="floating-logo" />

      <div className="register-box">
        <div className="form-toggle">
          <button
            onClick={() => setIsSignup(false)}
            className={!isSignup ? "active-toggle" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={isSignup ? "active-toggle" : ""}
          >
            Signup
          </button>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
