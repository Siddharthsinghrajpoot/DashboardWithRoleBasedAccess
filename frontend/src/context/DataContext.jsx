import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const mockProducts = response.data.slice(0, 20).map(post => ({
        id: post.id,
        name: `Product ${post.id}`,
        description: post.title,
        price: Math.floor(Math.random() * 1000) + 10,
        category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)]
      }));
      setProducts(mockProducts);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      setUsers([...users, { ...response.data, id: Date.now() }]);
      toast.success('User added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add user');
      return false;
    }
  };

  const updateUser = async (id, userData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData);
      setUsers(users.map(user => user.id === id ? { ...user, ...userData } : user));
      toast.success('User updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update user');
      return false;
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
      return true;
    } catch (error) {
      toast.error('Failed to delete user');
      return false;
    }
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };
    setProducts([...products, newProduct]);
    toast.success('Product added successfully');
    return true;
  };

  const updateProduct = (id, productData) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
    toast.success('Product updated successfully');
    return true;
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
    return true;
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  return (
    <DataContext.Provider value={{
      users,
      products,
      loading,
      addUser,
      updateUser,
      deleteUser,
      addProduct,
      updateProduct,
      deleteProduct,
      fetchUsers,
      fetchProducts
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};