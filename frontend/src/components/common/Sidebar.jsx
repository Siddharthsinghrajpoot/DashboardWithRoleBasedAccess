import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  FiHome, 
  FiUsers, 
  FiPackage, 
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard', roles: ['admin', 'manager', 'user'] },
    { path: '/users', icon: FiUsers, label: 'Users', roles: ['admin', 'manager'] },
    { path: '/products', icon: FiPackage, label: 'Products', roles: ['admin', 'manager', 'user'] },
    { path: '/settings', icon: FiSettings, label: 'Settings', roles: ['admin', 'manager', 'user'] },
  ];

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 24px',
    color: colors.textSecondary,
    textDecoration: 'none',
    transition: 'all 0.2s',
    backgroundColor: isActive ? (colors.darkMode ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff') : 'transparent',
    borderRight: isActive ? `4px solid ${colors.primary}` : 'none',
    fontWeight: isActive ? '600' : 'normal'
  });

  return (
    <aside style={{ ...styles.sidebar, backgroundColor: colors.surface, borderRightColor: colors.border }}>
      <div style={styles.logoContainer}>
        <h1 style={{ ...styles.logo, color: colors.text }}>AdminDash</h1>
        <p style={{ ...styles.role, color: colors.textSecondary }}>
          Role: {user?.role}
        </p>
      </div>
      
      <nav style={styles.nav}>
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={navLinkStyle}
          >
            <item.icon style={styles.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '256px',
    borderRight: '1px solid',
    display: 'flex',
    flexDirection: 'column'
  },
  logoContainer: {
    padding: '24px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  role: {
    fontSize: '12px',
    marginTop: '4px'
  },
  nav: {
    marginTop: '24px'
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '12px'
  }
};

export default Sidebar;