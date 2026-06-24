import { useState, useEffect } from 'react';
import { getTimeAgo } from '../utils/helpers';
import './ActivityFeed.css';

const ActivityFeed = ({ activities }) => {
  const [visibleActivities, setVisibleActivities] = useState([]);

  useEffect(() => {
    if (activities && activities.length > 0) {
      setVisibleActivities(activities.slice(0, 10));
    }
  }, [activities]);

  const getActivityIcon = (type) => {
    const icons = {
      upload: '📤',
      bookmark: '🔖',
      rating: '⭐',
      download: '⬇️',
      comment: '💬',
      share: '🔗',
      edit: '✏️',
      delete: '🗑️',
      view: '👁️'
    };
    return icons[type] || '📌';
  };

  const getActivityColor = (type) => {
    const colors = {
      upload: '#3b82f6',
      bookmark: '#8b5cf6',
      rating: '#f59e0b',
      download: '#10b981',
      comment: '#06b6d4',
      share: '#ec4899',
      edit: '#6b7280',
      delete: '#ef4444',
      view: '#6366f1'
    };
    return colors[type] || '#6b7280';
  };

  const getActivityLabel = (type) => {
    const labels = {
      upload: 'Uploaded',
      bookmark: 'Bookmarked',
      rating: 'Rated',
      download: 'Downloaded',
      comment: 'Commented',
      share: 'Shared',
      edit: 'Edited',
      delete: 'Deleted',
      view: 'Viewed'
    };
    return labels[type] || 'Activity';
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="activity-feed-empty">
        <span className="empty-icon">📭</span>
        <p>No recent activity</p>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <h3>📈 Recent Activity</h3>
        <span className="activity-count">{activities.length} activities</span>
      </div>
      <div className="activity-timeline">
        {visibleActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div 
              className="activity-icon" 
              style={{ background: `${getActivityColor(activity.type)}20` }}
            >
              <span style={{ color: getActivityColor(activity.type) }}>
                {getActivityIcon(activity.type)}
              </span>
            </div>
            <div className="activity-content">
              <div className="activity-message">
                <span className="activity-action">{getActivityLabel(activity.type)}</span>
                <span className="activity-title">{activity.title || 'a resource'}</span>
              </div>
              <div className="activity-time">{getTimeAgo(activity.timestamp)}</div>
            </div>
            {activity.link && (
              <a href={activity.link} className="activity-link">View →</a>
            )}
          </div>
        ))}
      </div>
      {activities.length > 10 && (
        <button className="activity-load-more btn btn-secondary btn-sm">
          View All ({activities.length})
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;