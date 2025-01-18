import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../../config/config';
import { MdOutlineNotificationsActive } from 'react-icons/md';

const Notification = ({ notifications, fetchNotifications }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.post(
        `${API_CONFIG.baseURL}/api/notifications/${notificationId}/read`,
      );
      fetchNotifications();
    } catch (error) {
      console.error('Could not mark notification as read:', error);
    }
  };

  return (
    <div className="notification-icon" ref={dropdownRef}>
      <button className="notification-button" onClick={toggleDropdown}>
        <MdOutlineNotificationsActive />{' '}
        <span className="notification-badge">
          {notifications.filter((n) => !n.read).length}
        </span>
      </button>
      {showDropdown && (
        <div className="notification-alert">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`notification-item ${
                notification.read ? '' : 'notification-unread'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
