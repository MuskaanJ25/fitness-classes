import { Link } from 'react-router-dom';

const ClassCard = ({ fitnessClass }) => {
  const getIntensityClass = (intensity) => {
    return `intensity-${intensity.toLowerCase()}`;
  };

  return (
    <div className="card class-card h-100">
      <div 
        className="card-header-custom"
        style={{ backgroundColor: fitnessClass.image }}
      >
        <h5 className="card-title mb-2">{fitnessClass.name}</h5>
        <p className="instructor mb-0">👤 {fitnessClass.instructor}</p>
      </div>
      <div className="card-body">
        <div className="class-meta">
          <div className="meta-item">
            <span>⏱️</span>
            <strong>{fitnessClass.duration} minutes</strong>
          </div>
          <div className="meta-item">
            <span>💪</span>
            <span className={`intensity-badge ${getIntensityClass(fitnessClass.intensity)}`}>
              {fitnessClass.intensity}
            </span>
          </div>
          <div className="meta-item">
            <span>📅</span>
            <span className="schedule-badge">{fitnessClass.schedule}</span>
          </div>
          <div className="meta-item">
            <span>👥</span>
            <span className="capacity-badge">
              Max {fitnessClass.capacity} participants
            </span>
          </div>
        </div>
        <Link to={`/classes/${fitnessClass.id}`} className="btn btn-view-class">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;