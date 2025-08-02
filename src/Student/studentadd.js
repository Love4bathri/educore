import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Studentadd() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    collegeId: "",
    mobileNo: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { pid: id } = useParams();
  const url = "http://localhost:7000/api/student";

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  async function getData(id) {
    try {
      const response = await axios.get(`${url}/${id}`);
      setData(response.data);
    } catch (err) {
      console.log("Get student error:", err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error
  }

  function validate() {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!data.emailId.trim()) {
      newErrors.emailId = "Email ID is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.emailId)) {
        newErrors.emailId = "Invalid email format";
      }
    }

    if (!data.collegeId.trim()) newErrors.collegeId = "College ID is required";

    if (!data.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(data.mobileNo)) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    const method = id ? axios.put : axios.post;
    const endpoint = id ? `${url}/${id}` : url;

    try {
      await method(endpoint, data);
      navigate("/studentlist");
    } catch (err) {
      console.log("Submit error:", err);
    }
  }

  return (
    <>
      <section className="h-100" style={{ backgroundColor: "#8fc4b7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 mb-md-5 px-md-2">
                    {id ? "Edit Student" : "Add Student"}
                  </h3>

                  <form className="px-md-2" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        placeholder="First Name"
                      />
                      <label className="form-label">First Name</label>
                      {errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        placeholder="Last Name"
                      />
                      <label className="form-label">Last Name</label>
                      {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="emailId"
                        value={data.emailId}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.emailId ? "is-invalid" : ""
                        }`}
                        placeholder="Email ID"
                      />
                      <label className="form-label">Email ID</label>
                      {errors.emailId && (
                        <div className="invalid-feedback">{errors.emailId}</div>
                      )}
                    </div>

                    {/* College ID */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="collegeId"
                        value={data.collegeId}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.collegeId ? "is-invalid" : ""
                        }`}
                        placeholder="College ID"
                      />
                      <label className="form-label">College ID</label>
                      {errors.collegeId && (
                        <div className="invalid-feedback">{errors.collegeId}</div>
                      )}
                    </div>

                    {/* Mobile No */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        name="mobileNo"
                        value={data.mobileNo}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.mobileNo ? "is-invalid" : ""
                        }`}
                        placeholder="Mobile Number"
                      />
                      <label className="form-label">Mobile No</label>
                      {errors.mobileNo && (
                        <div className="invalid-feedback">{errors.mobileNo}</div>
                      )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-success btn-lg mb-1">
                      {id ? "Update" : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
