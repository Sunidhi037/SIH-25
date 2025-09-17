import React, { useState, useEffect } from "react"; // 1. useEffect added here
import { useNavigate } from "react-router-dom";


function SignupPage() {
  const [activeTab, setActiveTab] = useState("student");
  const navigate = useNavigate();

  // State for inputs
  const [fullName, setFullName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [collegeIdError, setCollegeIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // API feedback
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // 2. This is the debugging code we added.
  useEffect(() => {
    console.log("Checking API URL:", import.meta.env.REACT_APP_API_URL);
  }, []);

  // Password rules
  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one capital letter.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value))
      return "Password must contain at least one special character.";
    return "";
  };

  // Handle input changes
  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setFullNameError(value.trim() === "" ? "Full Name cannot be empty." : "");
  };

  const handleCollegeIdChange = (e) => {
    const value = e.target.value;
    setCollegeId(value);
    setCollegeIdError(value.trim() === "" ? "College ID cannot be empty." : "");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  // ============================
  //   SUBMIT HANDLER
  // ============================
  const handleSignup = async (event) => {
    event.preventDefault();

    // Validate all before submit
    const passErr = validatePassword(password);
    const nameErr = fullName.trim() === "" ? "Full Name cannot be empty." : "";
    const idErr = collegeId.trim() === "" ? "College ID cannot be empty." : "";

    setFullNameError(nameErr);
    setCollegeIdError(idErr);
    setPasswordError(passErr);

    if (passErr || nameErr || idErr) return;

    try {
      setLoading(true);
      setServerError("");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          collegeId,
          password,
          role: activeTab, // student/counselor/admin
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Signup failed");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      alert("Signup successful! Please login now.");
      navigate("/"); // go to login page
    } catch (error) {
      console.error(error);
      setServerError("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">Join MannMitra Today</p>
        </div>

        {/* Tabs for role */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === "student" ? "active" : ""}`}
            onClick={() => setActiveTab("student")}
          >
            Student
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "counselor" ? "active" : ""}`}
            onClick={() => setActiveTab("counselor")}
          >
            Counselor
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSignup} noValidate>
          {/* Student registration form */}
          {activeTab === "student" && (
            <>
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Enter your full name"
                />
                {fullNameError && (
                  <p className="error-message">{fullNameError}</p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="collegeId">College ID</label>
                <input
                  type="text"
                  id="collegeId"
                  value={collegeId}
                  onChange={handleCollegeIdChange}
                  placeholder="Enter your College ID"
                />
                {collegeIdError && (
                  <p className="error-message">{collegeIdError}</p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Create a password"
                />
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a href="/terms" className="auth-link">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="auth-link">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </>
          )}

          {/* Counselor/Admin info */}
          {activeTab === "counselor" && (
            <p className="auth-subtitle">
              Counselor registration is handled by administration.
            </p>
          )}
          {activeTab === "admin" && (
            <p className="auth-subtitle">
              Admin registration is handled by administration.
            </p>
          )}
        </form>

        {serverError && <p className="error-message">{serverError}</p>}

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <a href="/" className="auth-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;