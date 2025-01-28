import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi"; 
import { FaGoogle, FaFacebook } from "react-icons/fa"; 
import axios from "axios"; 
import "./Signup.css";
import { auth } from "../firebase/firebase"; // Import Firebase
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Signup Request Payload:", { email, password, username, birthday }); 

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register",
        { email, password, username, birthday }, 
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );      

      if (response.status === 200) {
        alert("Signup successful!");
        console.log("Response Data:", response.data); 
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data); 
        alert(`Signup failed: ${err.response.data.detail || "Invalid input"}`);
      } else {
        console.error("Error:", err.message); 
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(
        "http://127.0.0.1:8000/users/google-signup",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Google signup successful!");
        console.log("Google Signup Response Data:", res.data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Google signup failed", error);
      alert(error.message || "Google signup failed");
    }
  };

  const handleFacebookSignup = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await axios.post(
        "http://127.0.0.1:8000/users/facebook-signup",
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Facebook signup successful!");
        console.log("Facebook Signup Response Data:", res.data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Facebook signup failed", error);
      alert(error.message || "Facebook signup failed");
    }
  };

  return (
    <div className="signup-auth-page">
      <div className="signup-auth-container">
        <div className="signup-logo">Finance Quest</div>
        <h2 className="signup-title">Signup</h2>
        <p className="signup-subtitle">Create an account to continue</p>
        <div className="signup-divider"></div>
        <form onSubmit={handleSignup} className="signup-form">
          <div className="signup-input-container">
            <FiMail className="signup-input-icon" />
            <input
              type="email"
              placeholder="jane@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-input-container">
            <FiLock className="signup-input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signup-input-container">
            <input
              type="date"
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-auth-btn">Signup</button>
        </form>
        <div className="signup-social-login">
          <button onClick={handleGoogleSignup} className="signup-google-btn">
            <FaGoogle className="signup-social-icon" /> Google
          </button>
          <button onClick={handleFacebookSignup} className="signup-facebook-btn">
            <FaFacebook className="signup-social-icon" /> Facebook
          </button>
        </div>
        <p className="signup-login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;