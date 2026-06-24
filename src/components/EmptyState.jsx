import './EmptyState.css';

export const EmptyState = ({ icon, title, description, actionText, actionLink, actionIcon }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionText && actionLink && (
        <a href={actionLink} className="btn btn-primary">
          {actionIcon && <span>{actionIcon}</span>}
          {actionText}
        </a>
      )}
    </div>
  );
};

export const EmptyStateSearch = () => (
  <EmptyState
    icon="🔍"
    title="No Results Found"
    description="Try adjusting your search terms or filters to find what you're looking for."
    actionText="Clear Filters"
    actionLink="#"
    actionIcon="🔄"
  />
);

export const EmptyStateBookmarks = () => (
  <EmptyState
    icon="🔖"
    title="No Bookmarks Yet"
    description="Start saving resources by clicking the bookmark button on any resource."
    actionText="Browse Resources"
    actionLink="/resources"
    actionIcon="📚"
  />
);

export const EmptyStateUploads = () => (
  <EmptyState
    icon="📤"
    title="No Uploads Yet"
    description="Share your knowledge with the community by uploading your first resource."
    actionText="Upload Resource"
    actionLink="/upload"
    actionIcon="📤"
  />
);