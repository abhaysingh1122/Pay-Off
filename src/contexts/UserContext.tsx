import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Transaction } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
  user: User | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  updateBalance: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const login = (email: string, name: string) => {
    const newUser: User = {
      id: uuidv4(),
      name,
      email,
      balance: 1000, // Starting balance for demo
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      timestamp: Date.now(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({
        ...user,
        balance: user.balance + amount,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        transactions,
        isAuthenticated: !!user,
        login,
        logout,
        addTransaction,
        updateBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};