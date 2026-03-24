import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';

const Settings = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div>
      <div style={styles.header}>
        <h1 style={{ ...styles.title, color: colors.text }}>Settings</h1>
        <p style={{ ...styles.subtitle, color: colors.textSecondary }}>Manage your account preferences</p>
      </div>
      
      <div style={{ ...styles.card, backgroundColor: colors.surface, borderColor: colors.border }}>
        <h2 style={{ ...styles.sectionTitle, color: colors.text }}>Profile Information</h2>
        <div style={styles.profileInfo}>
          <div>
            <label style={{ ...styles.label, color: colors.text }}>Name</label>
            <input
              type="text"
              value={user?.name}
              disabled
              style={{ ...styles.disabledInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            />
          </div>
          <div>
            <label style={{ ...styles.label, color: colors.text }}>Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              style={{ ...styles.disabledInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            />
          </div>
          <div>
            <label style={{ ...styles.label, color: colors.text }}>Role</label>
            <input
              type="text"
              value={user?.role?.toUpperCase()}
              disabled
              style={{ ...styles.disabledInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            />
          </div>
        </div>
      </div>
      
      <div style={{ ...styles.card, backgroundColor: colors.surface, borderColor: colors.border }}>
        <h2 style={{ ...styles.sectionTitle, color: colors.text }}>Preferences</h2>
        <div style={styles.preferences}>
          <div style={styles.preferenceItem}>
            <div>
              <p style={{ ...styles.preferenceTitle, color: colors.text }}>Dark Mode</p>
              <p style={{ ...styles.preferenceDesc, color: colors.textSecondary }}>Toggle dark/light theme</p>
            </div>
            <ThemeToggle />
          </div>
          
          <div style={styles.preferenceItem}>
            <div>
              <p style={{ ...styles.preferenceTitle, color: colors.text }}>Email Notifications</p>
              <p style={{ ...styles.preferenceDesc, color: colors.textSecondary }}>Receive email updates</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              style={{
                ...styles.toggle,
                backgroundColor: notifications ? colors.primary : colors.border
              }}
            >
              <span style={{
                ...styles.toggleSlider,
                transform: notifications ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </button>
          </div>
          
          <div style={styles.preferenceItem}>
            <div>
              <p style={{ ...styles.preferenceTitle, color: colors.text }}>Auto-save</p>
              <p style={{ ...styles.preferenceDesc, color: colors.textSecondary }}>Automatically save changes</p>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              style={{
                ...styles.toggle,
                backgroundColor: autoSave ? colors.primary : colors.border
              }}
            >
              <span style={{
                ...styles.toggleSlider,
                transform: autoSave ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '4px'
  },
  subtitle: {
    margin: 0
  },
  card: {
    borderRadius: '8px',
    border: '1px solid',
    padding: '24px',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    marginBottom: '20px'
  },
  profileInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  disabledInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'not-allowed'
  },
  preferences: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  preferenceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  preferenceTitle: {
    fontSize: '14px',
    fontWeight: '500',
    margin: 0,
    marginBottom: '4px'
  },
  preferenceDesc: {
    fontSize: '12px',
    margin: 0
  },
  toggle: {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  toggleSlider: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'transform 0.2s'
  }
};

export default Settings;