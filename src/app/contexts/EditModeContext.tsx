import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken } from '../utils/api';

interface EditModeContextType {
  isEditMode: boolean;
  isAuthenticated: boolean;
  toggleEditMode: () => void;
  setEditMode: (mode: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  isAuthenticated: false,
  toggleEditMode: () => {},
  setEditMode: () => {}
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const setEditMode = (mode: boolean) => {
    setIsEditMode(mode);
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode: isEditMode && isAuthenticated, 
      isAuthenticated,
      toggleEditMode,
      setEditMode 
    }}>
      {children}
    </EditModeContext.Provider>
  );
};