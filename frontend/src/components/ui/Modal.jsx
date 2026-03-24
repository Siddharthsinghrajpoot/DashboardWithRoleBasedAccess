import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const Modal = ({ isOpen, onClose, children }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, backgroundColor: colors.surface }}>
        <button
          onClick={onClose}
          style={{ ...styles.closeButton, color: colors.textSecondary }}
        >
          <FiX />
        </button>
        {children}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  modal: {
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
    padding: '24px'
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px'
  }
};

export default Modal;