import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ fixed router import

export default function Useradd() {
  const [data, Setdata] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    password: "",
    dob: "",
  });
  const [msg, setMsg] = useState("please fill all fields");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const param = useParams();

  let url = "https://educore-1.onrender.com/api/user";
  let id = param.pid;

  // ✅ Wrapped getData in useCallback to prevent ESLint warning
  const getData = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/${id}`);
      Setdata(response.data.data);
    } catch (err) {
      console.log("useradd err", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id, getData]); // ✅ No ESLint warning now

  function handleChange(event) {
    Setdata((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setMsg(""); // Clear message on change
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, loginId, password, dob } = data;
    if (!firstName || !lastName || !loginId || !password || !dob) {
      setMsg("All fields are required");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    const method = id ? axios.put : axios.post;
    const endpoint = id ? `${url}/${id}` : url;

    method(endpoint, data)
      .then((res) => {
        setMsg(res.data.message);
        setTimeout(() => {
          setMsg("");
          navigate("/Userlist");
        }, 2000);
      })
      .catch((err) => {
        setMsg("Something went wrong");
        console.error("Submit error:", err);
      });
  }

  return (
    <>
      <div>
        <section className="h-50" style={{ backgroundColor: "#8fc4b7" }}>
          {loading && <p>Loading user data...</p>}

          <div className="container py-5 h-50">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-8 col-xl-6">
                <div className="card rounded-3">
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                      Add user Details
                    </h3>

                    <form onSubmit={handleSubmit} className="px-md-2">
                      {msg && (
                        <p style={{ color: "red", marginBottom: "10px" }}>
                          {msg}
                        </p>
                      )}

                      <div className="form-outline mb-4">
                        <input
                          required
                          value={data.firstName}
                          onChange={handleChange}
                          type="text"
                          name="firstName"
                          id="form3Example1q"
                          className="form-control"
                        />
                        <label
                          className="form-label"
                          htmlFor="form3Example1q"
                        >
                          FirstName <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          required
                          name="lastName"
                          value={data.lastName}
                          onChange={handleChange}
                          type="text"
                          id="form3Example1"
                          className="form-control"
                        />
                        <label className="form-label" htmlFor="form3Example1">
                          LastName <span style={{ color: "red" }}>*</span>
                        </label>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline datepicker">
                            <input
                              required
                              value={data.loginId}
                              name="loginId"
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              id="exampleDatepicker1"
                            />
                            <label
                              htmlFor="exampleDatepicker1"
                              className="form-label"
                            >
                              LoginID   <span style={{ color: "red" }}>*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4 pb-2 pb-md-0 mb-md-5">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <input
                              name="dob"
                              required
                              value={data.dob}
                              onChange={handleChange}
                              type="date"
                              id="form3Example1w"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1w"
                            >
                              Date of birth  <span style={{ color: "red" }}>*</span>
                            </label>
                          </div>
                          <div className="form-outline">
                            <input
                              name="password"
                              required
                              value={data.password}
                              onChange={handleChange}
                              type="password"
                              id="form3Example"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example"
                            >
                              Password <span style={{ color: "red" }}>*</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-success btn-lg mb-1">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
