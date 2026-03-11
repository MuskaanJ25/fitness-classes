import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Transform Your Fitness</h1>
        <p>Discover energetic classes that fit your lifestyle and goals</p>
        <Link to="/classes" className="btn btn-gradient">
          Explore Classes
        </Link>
      </div>
    </section>
  );
};

export default Hero;