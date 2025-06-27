import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock users - En producción esto vendría de una base de datos
  const mockUsers = {
    // Manager/Admin users
    'admin@workzen.com': {
      id: 1,
      email: 'admin@workzen.com',
      name: 'Admin Manager',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin',
      company: 'WorkZen Corp'
    },
    'manager@workzen.com': {
      id: 2,
      email: 'manager@workzen.com',
      name: 'Sarah Manager',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
      company: 'WorkZen Corp'
    },
    // Employee users
    'alice@workzen.com': {
      id: 3,
      email: 'alice@workzen.com',
      name: 'Alice Johnson',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
      position: 'Senior Developer',
      managerId: 1
    },
    'bob@workzen.com': {
      id: 4,
      email: 'bob@workzen.com',
      name: 'Bob Martinez',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob',
      position: 'UX Designer',
      managerId: 1
    },
    'carol@workzen.com': {
      id: 5,
      email: 'carol@workzen.com',
      name: 'Carol Smith',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carol',
      position: 'Product Manager',
      managerId: 2
    }
  };

  useEffect(() => {
    // Check if user is logged in (localStorage)
    const savedUser = localStorage.getItem('workzen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication - En producción esto sería una llamada a API
    const userData = mockUsers[email];
    
    if (userData && password === 'password123') { // Mock password
      setUser(userData);
      localStorage.setItem('workzen_user', JSON.stringify(userData));
      
      // Redirect based on role
      if (userData.role === 'manager') {
        router.push('/admin/dashboard-simple');
      } else {
        router.push('/employee/dashboard');
      }
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('workzen_user');
    router.push('/login');
  };

  const isManager = () => user?.role === 'manager';
  const isEmployee = () => user?.role === 'employee';

  const value = {
    user,
    login,
    logout,
    isManager,
    isEmployee,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
