import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/ui/Modal';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';

const Products = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  
  const itemsPerPage = 6;
  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: '' });
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category
    });
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };
  
  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={{ ...styles.title, color: colors.text }}>Products Management</h1>
          <p style={{ ...styles.subtitle, color: colors.textSecondary }}>Manage your product catalog</p>
        </div>
        
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', description: '', price: '', category: '' });
              setIsModalOpen(true);
            }}
            style={{ ...styles.addButton, backgroundColor: colors.primary }}
          >
            <FiPlus style={styles.buttonIcon} />
            <span>Add Product</span>
          </button>
        )}
      </div>
      
      <div style={{ ...styles.card, backgroundColor: colors.surface, borderColor: colors.border }}>
        <div style={styles.filters}>
          <div style={styles.searchWrapper}>
            <FiSearch style={{ ...styles.searchIcon, color: colors.textSecondary }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...styles.searchInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ ...styles.select, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div style={styles.productsGrid}>
          {paginatedProducts.map((product) => (
            <div key={product.id} style={{ ...styles.productCard, borderColor: colors.border, backgroundColor: colors.background }}>
              <div style={styles.productHeader}>
                <div style={styles.productInfo}>
                  <h3 style={{ ...styles.productName, color: colors.text }}>{product.name}</h3>
                  <p style={{ ...styles.productDesc, color: colors.textSecondary }}>{product.description}</p>
                  <div style={styles.productMeta}>
                    <span style={{ ...styles.category, backgroundColor: `${colors.primary}20`, color: colors.primary }}>
                      {product.category}
                    </span>
                    <span style={{ ...styles.price, color: colors.primary }}>
                      ${product.price}
                    </span>
                  </div>
                </div>
                
                {(user?.role === 'admin' || user?.role === 'manager') && (
                  <div style={styles.productActions}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{ ...styles.actionButton, color: colors.primary }}
                    >
                      <FiEdit2 />
                    </button>
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleDelete(product.id)}
                        style={{ ...styles.actionButton, color: colors.danger }}
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
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
        <h2 style={{ ...styles.modalTitle, color: colors.text }}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} style={styles.modalForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text, minHeight: '80px' }}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            style={{ ...styles.modalInput, backgroundColor: colors.background, borderColor: colors.border, color: colors.text }}
            required
          >
            <option value="">Select Category</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div style={styles.modalButtons}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ ...styles.cancelButton, backgroundColor: colors.border, color: colors.text }}>
              Cancel
            </button>
            <button type="submit" style={{ ...styles.submitButton, backgroundColor: colors.primary, color: 'white' }}>
              {editingProduct ? 'Update' : 'Create'}
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
  filters: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
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
  select: {
    padding: '8px 12px',
    border: '1px solid',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '24px'
  },
  productCard: {
    border: '1px solid',
    borderRadius: '8px',
    padding: '16px',
    transition: 'box-shadow 0.2s'
  },
  productHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px'
  },
  productInfo: {
    flex: 1
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    marginBottom: '8px'
  },
  productDesc: {
    fontSize: '14px',
    margin: 0,
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  productMeta: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  category: {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  productActions: {
    display: 'flex',
    gap: '8px'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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

export default Products;