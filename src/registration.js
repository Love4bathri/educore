import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Regis() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    password: "",
    dob: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const url = "https://educore-1.onrender.com/api/user";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.loginId.trim()) {
      newErrors.loginId = "Login ID is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.loginId)) {
        newErrors.loginId = "Login ID must be a valid email address";
      }
    }
    if (!data.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await axios.post(url, data);
      navigate("/login");
    } catch (err) {
      console.log("Error submitting registration:", err);
    }
  };

  return (
    <section className="h-50" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-50">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Register New User
                </h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      placeholder="First Name"
                    />
                    <label className="form-label">First Name</label>
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      placeholder="Last Name"
                    />
                    <label className="form-label">Last Name</label>
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      name="loginId"
                      value={data.loginId}
                      onChange={handleChange}
                      className={`form-control ${errors.loginId ? "is-invalid" : ""}`}
                      placeholder="Login ID"
                    />
                    <label className="form-label">Login ID</label>
                    {errors.loginId && (
                      <div className="invalid-feedback">{errors.loginId}</div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      name="dob"
                      value={data.dob}
                      onChange={handleChange}
                      className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                    />
                    <label className="form-label">Date of Birth</label>
                    {errors.dob && (
                      <div className="invalid-feedback">{errors.dob}</div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Password"
                    />
                    <label className="form-label">Password</label>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-success btn-lg mb-1">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
