import { useState, useEffect } from 'react';
import ClassCard from '../components/ClassCard';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching classes:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-5 mt-3">
      <div className="container">
        <h1 className="section-title">All Classes</h1>
        
        {loading ? (
          <div className="spinner-custom">
            <div className="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {classes.map(fitnessClass => (
              <div className="col-12 col-md-6 col-lg-3" key={fitnessClass.id}>
                <ClassCard fitnessClass={fitnessClass} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;