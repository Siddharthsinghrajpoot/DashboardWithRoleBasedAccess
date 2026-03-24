import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const { colors } = useTheme();

  return (
    <div style={{ ...styles.container, backgroundColor: colors.background }}>
      <Sidebar />
      <div style={styles.mainContent}>
        <Header />
        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  main: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '24px'
  }
};

export default Layout;