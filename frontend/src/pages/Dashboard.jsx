import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/dashboard/StatCard';
import Charts from '../components/dashboard/Charts';
import { FiUsers, FiPackage, FiTrendingUp, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const { users, products } = useData();
  const { colors } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    activeSessions: 0,
    revenue: 0
  });

  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      activeSessions: Math.floor(Math.random() * 100) + 50,
      revenue: products.reduce((sum, p) => sum + (p.price || 0), 0)
    });
  }, [users, products]);

  return (
    <div style={styles.container}>
      <div>
        <h1 style={{ ...styles.pageTitle, color: colors.text }}>Dashboard Overview</h1>
        <p style={{ ...styles.pageSubtitle, color: colors.textSecondary }}>
          Welcome back, {user?.name}! Here's what's happening with your platform today.
        </p>
      </div>
      
      <div style={styles.statsGrid}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FiUsers style={styles.icon} />}
          color="primary"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<FiPackage style={styles.icon} />}
          color="success"
        />
        <StatCard
          title="Active Sessions"
          value={stats.activeSessions}
          icon={<FiActivity style={styles.icon} />}
          color="warning"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          icon={<FiTrendingUp style={styles.icon} />}
          color="primary"
        />
      </div>
      
      <Charts />
      
      <div style={{ ...styles.activityCard, backgroundColor: colors.surface, borderColor: colors.border }}>
        <h3 style={{ ...styles.activityTitle, color: colors.text }}>Recent Activity</h3>
        <div style={styles.activityList}>
          {users.slice(0, 5).map((userItem) => (
            <div key={userItem.id} style={{ ...styles.activityItem, borderBottomColor: colors.border }}>
              <div>
                <p style={{ ...styles.activityName, color: colors.text }}>{userItem.name}</p>
                <p style={{ ...styles.activityEmail, color: colors.textSecondary }}>{userItem.email}</p>
              </div>
              <span style={{ ...styles.activityTime, color: colors.textSecondary }}>Joined recently</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '8px'
  },
  pageSubtitle: {
    margin: 0,
    marginBottom: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  icon: {
    width: '24px',
    height: '24px'
  },
  activityCard: {
    borderRadius: '8px',
    border: '1px solid',
    padding: '24px',
    marginTop: '24px'
  },
  activityTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
    marginBottom: '16px'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  activityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid'
  },
  activityName: {
    fontSize: '14px',
    fontWeight: '500',
    margin: 0,
    marginBottom: '4px'
  },
  activityEmail: {
    fontSize: '12px',
    margin: 0
  },
  activityTime: {
    fontSize: '12px'
  }
};

export default Dashboard;