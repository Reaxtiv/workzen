import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

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

  // Mock users mapped by wallet address - En producción esto vendría de una base de datos
  const mockUsers = {
    // Manager/Admin users (mapped by wallet address)
    '0x742f35cc6bf8074b4a5c4bde7b5a8a5c8a1f2c3d': {
      id: 1,
      walletAddress: '0x742f35cc6bf8074b4a5c4bde7b5a8a5c8a1f2c3d',
      name: 'Admin Manager',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin',
      company: 'WorkZen Corp'
    },
    '0x123a35cc6bf8074b4a5c4bde7b5a8a5c8a1f2abc': {
      id: 2,
      walletAddress: '0x123a35cc6bf8074b4a5c4bde7b5a8a5c8a1f2abc',
      name: 'Sarah Manager',
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
      company: 'WorkZen Corp'
    },
    // Employee users
    '0x456b35cc6bf8074b4a5c4bde7b5a8a5c8a1f2def': {
      id: 3,
      walletAddress: '0x456b35cc6bf8074b4a5c4bde7b5a8a5c8a1f2def',
      name: 'Alice Johnson',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
      position: 'Senior Developer',
      managerId: 1
    },
    '0x789c35cc6bf8074b4a5c4bde7b5a8a5c8a1f2ghi': {
      id: 4,
      walletAddress: '0x789c35cc6bf8074b4a5c4bde7b5a8a5c8a1f2ghi',
      name: 'Bob Martinez',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Bob',
      position: 'UX Designer',
      managerId: 1
    },
    '0xabcd35cc6bf8074b4a5c4bde7b5a8a5c8a1f2jkl': {
      id: 5,
      walletAddress: '0xabcd35cc6bf8074b4a5c4bde7b5a8a5c8a1f2jkl',
      name: 'Carol Smith',
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Carol',
      position: 'Product Manager',
      managerId: 2
    }
  };

  // For demo purposes, any wallet can access any demo account
  const demoAccounts = [
    { 
      name: 'Admin Manager', 
      role: 'manager',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Admin',
      company: 'WorkZen Corp'
    },
    { 
      name: 'Alice Johnson', 
      role: 'employee',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alice',
      position: 'Senior Developer'
    }
  ];

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

  const loginWithWallet = async (walletAddress, selectedRole = null) => {
    try {
      // Check if this wallet is registered
      let userData = mockUsers[walletAddress.toLowerCase()];
      
      // If not registered and we have a demo role selection, create demo user
      if (!userData && selectedRole) {
        const demoAccount = demoAccounts.find(acc => acc.role === selectedRole);
        if (demoAccount) {
          userData = {
            id: Date.now(), // Generate temp ID
            walletAddress: walletAddress.toLowerCase(),
            ...demoAccount
          };
        }
      }
      
      // If still no user data, create a default employee account
      if (!userData) {
        userData = {
          id: Date.now(),
          walletAddress: walletAddress.toLowerCase(),
          name: `User ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          role: 'employee',
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${walletAddress}`,
          position: 'Team Member'
        };
      }

      setUser(userData);
      localStorage.setItem('workzen_user', JSON.stringify(userData));
      
      // Redirect based on role
      if (userData.role === 'manager') {
        router.push('/admin/dashboard-simple');
      } else {
        router.push('/employee/dashboard');
      }
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Failed to login with wallet' };
    }
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
    loginWithWallet,
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
