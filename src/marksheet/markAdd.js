import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function MarkAdd() {
    const [msg, setMsg] = useState("");
    
  const [data, setData] = useState({
    name: "",
    studentId: "",
    rollNo: "",
    physics: "",
    chemistry: "",
    maths: ""
  });

  const total = 
  (parseInt(data.physics) || 0) + 
  (parseInt(data.chemistry) || 0) + 
  (parseInt(data.maths) || 0);


  const navigate = useNavigate();
  
  const url = "https://educore-1.onrender.com/api/mark";
  const { pid } = useParams();

  
  useEffect(() => {
    if (pid) {
      axios.get(`${url}/${pid}`)
        .then(res => {
         const studentData = res.data.data || res.data; // 🛡️ fallback
        setData(studentData);
        })
        .catch(err => console.log("Fetch error", err));
    }
  }, [pid]);

  function handleChange(event) {
    setData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const { name, studentId, rollNo, physics, chemistry, maths } = data;
    if (!name || !studentId || !rollNo || !physics || !chemistry || !maths) {
      setMsg("All fields are required");
      return;
    }
    if(physics < 0 || chemistry < 0 || maths < 0) {
      setMsg("Marks cannot be negative");
      return;
    }
    if(physics > 100 || chemistry > 100 || maths > 100) {
      setMsg("Marks cannot exceed 100");
      return;
    }
    

    const method = pid ? axios.put : axios.post;
    const endpoint = pid ? `${url}/${pid}` : url;
    
    method(endpoint, data)
      .then((res) => {
        alert("Data submitted successfully");
        setTimeout(() => {
          
          navigate("/marksheetlist");
        }, 2000);
      })
      .catch((err) => {
       
        console.error("Submit error:", err);
      });
    
}
  return (
    <section className="h-100" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h3 className="mb-4">Student Marksheet Form</h3>
                <form className="px-md-2" onSubmit={handleSubmit}>
                  {/* 🚨 Error Message Display */}
                        {msg && (
                          <p style={{ color: "red", marginBottom: "10px" }}>{msg}</p>
                        )}

                  <div className="form-outline mb-3">
                    <input 
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Name"
                    />
                    <label className="form-label">Name</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="text"
                      name="studentId"
                      value={data.studentId}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter Student ID"
                    />
                    <label className="form-label">Student ID</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="number"
                      name="rollNo"
                      value={data.rollNo}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Roll No"
                    />
                    <label className="form-label">Roll No</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="number"
                      name="physics"
                      value={data.physics}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Physics"
                    />
                    <label className="form-label">Physics</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="number"
                      name="chemistry"
                      value={data.chemistry}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Chemistry"
                    />
                    <label className="form-label">Chemistry</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="number"
                      name="maths"
                      value={data.maths}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Maths"
                    />
                    <label className="form-label">Maths</label>
                  </div>
<p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "10px" }}>
  Total: { 
    (parseInt(data.physics) || 0) + 
    (parseInt(data.chemistry) || 0) + 
    (parseInt(data.maths) || 0) 
  } / 300
</p>
                  <button type="submit" className="btn btn-primary btn-lg mt-2">
                    Submit
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
