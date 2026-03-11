import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/classes')
      .then(res => res.json())
      .then(data => {
        const uniqueInstructors = [...new Map(data.map(c => 
          [c.instructor, c]
        )).values()];
        setInstructors(uniqueInstructors);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching instructors:', err);
        setLoading(false);
      });
  }, []);

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(part => part[0]).join('').toUpperCase();
  };

  const getIntensityClass = (intensity) => {
    return `intensity-${intensity.toLowerCase()}`;
  };

  return (
    <div className="py-5 mt-3">
      <div className="container">
        <h1 className="section-title">Our Expert Instructors</h1>
        
        {loading ? (
          <div className="spinner-custom">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {instructors.map((instructor, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div 
                  className="card class-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="card-header-custom d-flex align-items-center justify-content-center"
                    style={{ 
                      backgroundColor: instructor.image,
                      height: '150px',
                      fontSize: '4rem'
                    }}
                  >
                    {getInitials(instructor.instructor)}
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title mb-2">{instructor.instructor}</h5>
                    <div className="mb-3">
                      <span className={`intensity-badge ${getIntensityClass(instructor.intensity)}`}>
                        {instructor.intensity} intensity
                      </span>
                    </div>
                    <p className="text-muted mb-3">
                      {instructor.duration} min sessions
                    </p>
                    <Link 
                      to={`/classes`} 
                      className="btn btn-view-class"
                      state={{ filterInstructor: instructor.instructor }}
                    >
                      View Classes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;