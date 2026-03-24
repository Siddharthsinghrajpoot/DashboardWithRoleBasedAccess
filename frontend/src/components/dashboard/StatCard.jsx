import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ title, value, icon, color }) => {
  const { colors } = useTheme();

  const getBgColor = () => {
    switch(color) {
      case 'primary': return colors.primary;
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      default: return colors.primary;
    }
  };

  return (
    <div style={{ ...styles.card, backgroundColor: colors.surface, borderColor: colors.border }}>
      <div style={styles.content}>
        <div>
          <p style={{ ...styles.title, color: colors.textSecondary }}>{title}</p>
          <p style={{ ...styles.value, color: colors.text }}>{value}</p>
        </div>
        <div style={{ ...styles.iconContainer, backgroundColor: `${getBgColor()}20` }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '14px',
    margin: 0,
    marginBottom: '8px'
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  iconContainer: {
    padding: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default StatCard;