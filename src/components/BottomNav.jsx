import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  const navItems = [
    { to: '/dashboard', icon: '📊', label: 'Home' },
    { to: '/resources', icon: '📚', label: 'Resources' },
    { to: '/upload', icon: '📤', label: 'Upload' },
    { to: '/bookmarks', icon: '🔖', label: 'Bookmarks' },
    { to: '/profile', icon: '👤', label: 'Profile' },
  ];

  const adminItems = [
    { to: '/admin', icon: '⚙️', label: 'Admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item ${isActive(item.to) ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
            {isActive(item.to) && <span className="bottom-nav-indicator"></span>}
          </Link>
        ))}
        {role === 'ADMIN' && adminItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item admin-item ${isActive(item.to) ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
            {isActive(item.to) && <span className="bottom-nav-indicator admin-indicator"></span>}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;