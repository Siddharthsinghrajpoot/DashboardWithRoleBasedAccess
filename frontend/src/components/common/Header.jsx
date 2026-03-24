import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <header style={{ ...styles.header, backgroundColor: colors.surface, borderBottomColor: colors.border }}>
      <div style={styles.headerContent}>
        <div>
          <h2 style={{ ...styles.welcome, color: colors.text }}>
            Welcome back, {user?.name}
          </h2>
        </div>
        
        <div style={styles.rightSection}>
          <ThemeToggle />
          
          <div style={styles.userInfo}>
            <div style={{ ...styles.avatar, backgroundColor: colors.primary }}>
              <FiUser style={styles.avatarIcon} />
            </div>
            <div style={styles.userDetails}>
              <p style={{ ...styles.userName, color: colors.text }}>{user?.name}</p>
              <p style={{ ...styles.userRole, color: colors.textSecondary }}>{user?.role}</p>
            </div>
            
            <button
              onClick={logout}
              style={styles.logoutButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.darkMode ? '#374151' : '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FiLogOut style={styles.logoutIcon} />
              <span style={styles.logoutText}>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    borderBottom: '1px solid'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px'
  },
  welcome: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarIcon: {
    color: 'white',
    width: '16px',
    height: '16px'
  },
  userDetails: {
    display: 'none'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    margin: 0
  },
  userRole: {
    fontSize: '12px',
    margin: 0
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  logoutIcon: {
    width: '18px',
    height: '18px'
  },
  logoutText: {
    display: 'none'
  }
};

// Media queries for responsive
if (window.innerWidth >= 768) {
  styles.userDetails.display = 'block';
  styles.logoutText.display = 'inline';
}

export default Header;