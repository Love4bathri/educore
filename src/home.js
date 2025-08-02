import React from 'react';
 

const Home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">ManagePro</h1>
        <p className="lead text-muted">Smart Management for Smarter Teams</p>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm home-card">
            <div className="card-body">
              <h5 className="card-title">📋 Tasks</h5>
              <p className="card-text">Organize and monitor your to-dos effortlessly.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm home-card">
            <div className="card-body">
              <h5 className="card-title">👥 Team</h5>
              <p className="card-text">Coordinate with your team and assign duties.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm home-card">
            <div className="card-body">
              <h5 className="card-title">📊 Reports</h5>
              <p className="card-text">Analyze insights and performance trends.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm home-card">
            <div className="card-body">
              <h5 className="card-title">⚙️ Settings</h5>
              <p className="card-text">Control and customize your experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
