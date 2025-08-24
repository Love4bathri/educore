import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      // 👇 Yaha apna login API URL daalna
      const res = await fetch("https://educore-1.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);
      navigate("/"); // Redirect to home page on successful login
      
      if (res.ok) {
        alert("Login successful!");

      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Welcome Back</h3>
        <p className="text-center text-muted mb-4">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="loginId"
              value={formData.loginId}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control pe-5"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="btn btn-sm btn-light position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Registration link upar */}
          <div className="mb-2 text-end">
            <a href="/Regis" className="text-decoration-none">
              Create an account
            </a>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
