import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/ui/Modal';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

const Users = () => {
  const { user } = useAuth();
  const { users, addUser, updateUser, deleteUser } = useData();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: ''
  });
  
  const itemsPerPage = 5;
  
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await addUser(formData);
    }
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', username: '', phone: '' });
  };
  
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone || ''
    });
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };
  
  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={{ ...styles.title, color: colors.text }}>Users Management</h1>
          <p style={{ ...styles.subtitle, color: colors.textSecondary }}>Manage your platform users</p>
        </div>
        
        {user?.role === 'admin' && (
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', email: '', username: '', phone: '' });
              setIsModalOpen(true);
            }}
            style={{ ...styles.addButton, backgroundColor: colors.primary }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
            onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
          >
            <FiPlus style={styles.buttonIcon} />
            <span>Add User</span>
          </button>
        )}
      </div>
      
      <div style={{ ...styles.card, backgroundColor: colors.surface, borderColor: colors.border }}>
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <FiSearch style={{ ...styles.searchIcon, color: colors.textSecondary }} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...styles.searchInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            />
          </div>
        </div>
        
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={{ ...styles.tableHeader, backgroundColor: colors.background }}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Phone</th>
                {(user?.role === 'admin' || user?.role === 'manager') && (
                  <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((userItem) => (
                <tr key={userItem.id} style={{ ...styles.tableRow, borderBottomColor: colors.border }}>
                  <td style={{ ...styles.td, color: colors.text }}>{userItem.name}</td>
                  <td style={{ ...styles.td, color: colors.textSecondary }}>{userItem.email}</td>
                  <td style={{ ...styles.td, color: colors.textSecondary }}>{userItem.username}</td>
                  <td style={{ ...styles.td, color: colors.textSecondary }}>{userItem.phone || 'N/A'}</td>
                  {(user?.role === 'admin' || user?.role === 'manager') && (
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                      <button
                        onClick={() => handleEdit(userItem)}
                        style={{ ...styles.actionButton, color: colors.primary }}
                      >
                        <FiEdit2 />
                      </button>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => handleDelete(userItem.id)}
                          style={{ ...styles.actionButton, color: colors.danger }}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ ...styles.pageButton, borderColor: colors.border, color: colors.text }}
            >
              Previous
            </button>
            <span style={{ color: colors.textSecondary }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ ...styles.pageButton, borderColor: colors.border, color: colors.text }}
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 style={{ ...styles.modalTitle, color: colors.text }}>{editingUser ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit} style={styles.modalForm}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
          />
          <div style={styles.modalButtons}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ ...styles.cancelButton, backgroundColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" style={{ ...styles.submitButton, backgroundColor: colors.primary, color: 'white' }}>
              {editingUser ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
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
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500'
  },
  buttonIcon: {
    width: '18px',
    height: '18px'
  },
  card: {
    borderRadius: '8px',
    border: '1px solid',
    padding: '24px'
  },
  searchContainer: {
    marginBottom: '24px'
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '400px'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px 8px 40px',
    border: '1px solid',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  td: {
    padding: '12px',
    fontSize: '14px'
  },
  tableRow: {
    borderBottom: '1px solid'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    marginLeft: '8px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px'
  },
  pageButton: {
    padding: '6px 12px',
    border: '1px solid',
    borderRadius: '6px',
    background: 'none',
    cursor: 'pointer'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  modalInput: {
    padding: '10px',
    border: '1px solid',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px'
  },
  cancelButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Users;