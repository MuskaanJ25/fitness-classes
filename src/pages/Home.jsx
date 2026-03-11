import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ClassCard from '../components/ClassCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/classes')
      .then(res => res.json())
      .then(data => {
        setClasses(data.slice(0, 6)); // Show first 6 classes on home
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching classes:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Hero />
      
      <section className="py-5 mt-3">
        <div className="container">
          <h2 className="section-title">Featured Classes</h2>
          
          {loading ? (
            <div className="spinner-custom">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <div className="row g-4">
              {classes.map(fitnessClass => (
                <div className="col-12 col-md-6 col-lg-4" key={fitnessClass.id}>
                  <ClassCard fitnessClass={fitnessClass} />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-5">
            <Link to="/classes" className="btn btn-gradient">
              View All Classes
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="section-title">Why Choose FitZone?</h2>
          <div className="row g-4 text-center">
            <div className="col-12 col-md-4">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
              <h4>High Energy</h4>
              <p className="text-muted">Experience classes that push your limits and boost your energy</p>
            </div>
            <div className="col-12 col-md-4">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h4>Expert Instructors</h4>
              <p className="text-muted">Learn from certified professionals who are passionate about fitness</p>
            </div>
            <div className="col-12 col-md-4">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h4>Variety of Options</h4>
              <p className="text-muted">Find the perfect class that matches your fitness goals and preferences</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;