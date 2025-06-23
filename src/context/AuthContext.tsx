import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: 'customer' | 'shopkeeper') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, userType: 'customer' | 'shopkeeper') => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage and mockData
      const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
      let user = localUsers.find(
        (u: any) => u.email === email && u.password === password && u.userType === userType
      );

      if (!user) {
        user = users.find(
          (u: any) => u.email === email && u.password === password && (u.userType === userType || u.role === userType)
        );
      }

      if (user) {
        const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&background=random';
        user.avatar = user.photo || user.avatar || DEFAULT_AVATAR;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        throw new Error('Invalid email, password, or user type');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Do NOT redirect on error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Check for saved user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    currentUser,
    isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};