import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ClassDetail = () => {
  const { id } = useParams();
  const [fitnessClass, setFitnessClass] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/classes/${id}`)
      .then(res => res.json())
      .then(data => {
        setFitnessClass(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching class:', err);
        setLoading(false);
      });
  }, [id]);

  const getIntensityClass = (intensity) => {
    return `intensity-${intensity.toLowerCase()}`;
  };

  if (loading) {
    return (
      <div className="spinner-custom">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (!fitnessClass) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h3>Class Not Found</h3>
          <Link to="/classes" className="btn btn-gradient mt-3">
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div 
        className="class-detail-header"
        style={{ backgroundColor: fitnessClass.image }}
      >
        <div className="class-detail-content">
          <h1 className="mb-3">{fitnessClass.name}</h1>
          <p className="mb-0 fs-5">👤 {fitnessClass.instructor}</p>
        </div>
      </div>

      <div className="container">
        <div className="detail-card">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="detail-section">
                <h6>About This Class</h6>
                <p className="detail-description mb-0">{fitnessClass.description}</p>
              </div>

              <div className="detail-section">
                <h6>What You'll Experience</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Professional guidance from certified instructors</li>
                  <li className="mb-2">✅ Motivating atmosphere and energetic music</li>
                  <li className="mb-2">✅ Supportive community of fitness enthusiasts</li>
                  <li className="mb-0">✅ Personalized attention and modifications available</li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="detail-section">
                <h6>Duration</h6>
                <p className="value mb-0">⏱️ {fitnessClass.duration} minutes</p>
              </div>

              <div className="detail-section">
                <h6>Intensity Level</h6>
                <p className="value mb-0">
                  💪 <span className={`intensity-badge ${getIntensityClass(fitnessClass.intensity)}`}>
                    {fitnessClass.intensity}
                  </span>
                </p>
              </div>

              <div className="detail-section">
                <h6>Schedule</h6>
                <p className="schedule-badge mb-0">📅 {fitnessClass.schedule}</p>
              </div>

              <div className="detail-section">
                <h6>Capacity</h6>
                <p className="capacity-badge mb-0">👥 Max {fitnessClass.capacity} participants</p>
              </div>

              <Link to="/" className="btn btn-book-class d-block text-center text-decoration-none">
                Book This Class
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 mb-5">
          <Link to="/classes" className="btn btn-outline-secondary">
            ← Back to All Classes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;