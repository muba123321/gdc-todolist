import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation example
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccessMessage("");
    } else {
      console.log(formData);
      setError("");
      setSuccessMessage("Sign-up successful! Please log in.");
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-4">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Create an Account</h1>
            <p className="text-muted">
              Sign up to start managing your tasks effortlessly.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border rounded-4 p-5 shadow-sm bg-white"
          >
            <h2 className="text-center mb-4 fw-bold text-primary">Sign Up</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                id="username"
                className="form-control form-control-lg"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter a password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control form-control-lg"
                placeholder="Confirm your password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Sign Up
            </button>

            <div className="text-center">
              <p className="text-muted mb-0">
                Already have an account?{" "}
                <a
                  href="/"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
