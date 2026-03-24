import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiAlertTriangle } from 'react-icons/fi';

const Unauthorized = () => {
  const { colors } = useTheme();

  return (
    <div style={{ ...styles.container, backgroundColor: colors.background }}>
      <div style={styles.content}>
        <FiAlertTriangle style={{ ...styles.icon, color: colors.warning }} />
        <h1 style={{ ...styles.title, color: colors.text }}>403</h1>
        <p style={{ ...styles.subtitle, color: colors.text }}>Unauthorized Access</p>
        <p style={{ ...styles.message, color: colors.textSecondary }}>
          You don't have permission to access this page.
        </p>
        <Link to="/" style={{ ...styles.button, backgroundColor: colors.primary }}>
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center'
  },
  icon: {
    width: '80px',
    height: '80px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '72px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '24px',
    margin: 0,
    marginBottom: '16px'
  },
  message: {
    marginBottom: '24px'
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: '8px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Unauthorized;