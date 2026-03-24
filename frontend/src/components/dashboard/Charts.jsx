import React from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const lineData = [
  { month: 'Jan', users: 400, products: 240 },
  { month: 'Feb', users: 300, products: 280 },
  { month: 'Mar', users: 600, products: 320 },
  { month: 'Apr', users: 800, products: 400 },
  { month: 'May', users: 700, products: 450 },
  { month: 'Jun', users: 900, products: 520 },
];

const pieData = [
  { name: 'Admin', value: 1 },
  { name: 'Manager', value: 2 },
  { name: 'User', value: 47 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const Charts = () => {
  const { colors } = useTheme();

  return (
    <div style={styles.container}>
      <div style={{ ...styles.chartCard, backgroundColor: colors.surface, borderColor: colors.border }}>
        <h3 style={{ ...styles.chartTitle, color: colors.text }}>User & Product Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" stroke={colors.textSecondary} />
            <YAxis stroke={colors.textSecondary} />
            <Tooltip contentStyle={{ backgroundColor: colors.surface, borderColor: colors.border }} />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" />
            <Line type="monotone" dataKey="products" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div style={{ ...styles.chartCard, backgroundColor: colors.surface, borderColor: colors.border }}>
        <h3 style={{ ...styles.chartTitle, color: colors.text }}>User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: colors.surface }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px'
  },
  chartCard: {
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid'
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px'
  }
};

// Responsive
if (window.innerWidth >= 1024) {
  styles.container.gridTemplateColumns = 'repeat(2, 1fr)';
}

export default Charts;