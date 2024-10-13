import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f0f2f5" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-4">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Welcome Back!</h1>
            <p className="text-muted">
              Log in to manage your tasks effortlessly and stay organized.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border rounded-4 p-5 shadow-sm bg-white"
          >
            <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Login
            </button>

            <div className="text-center">
              <p className="text-muted mb-0">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-decoration-none text-primary fw-semibold"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
