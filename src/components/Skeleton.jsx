import './Skeleton.css';

export const SkeletonCard = ({ count = 4 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-actions">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonStats = ({ count = 4 }) => {
  return (
    <div className="skeleton-stats-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-stat">
          <div className="skeleton-stat-icon"></div>
          <div className="skeleton-stat-content">
            <div className="skeleton-stat-value"></div>
            <div className="skeleton-stat-label"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div className="skeleton-profile">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-name"></div>
      <div className="skeleton-email"></div>
      <div className="skeleton-stats">
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
      </div>
    </div>
  );
};