import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">FitZone</Link>
        <button 
          className="navbar-toggler ms-auto" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/classes" className={`nav-link ${isActive('/classes') || isActive('/classes/') ? 'active' : ''}`}>
                Classes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/instructors" className={`nav-link ${isActive('/instructors') ? 'active' : ''}`}>
                Instructors
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;