import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, getAuthToken } from '../utils/api';
import { DEFAULT_CONTENT } from '../utils/localStorage';

interface ContentContextType {
  content: Record<string, any>;
  updateContent: (key: string, value: any) => Promise<void>;
  loading: boolean;
  initializeDefaults: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, any>>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await apiClient.get('/content');
      
      // Convert array format from KV store to object
      const contentData: Record<string, any> = {}; 
      if (response.content && Array.isArray(response.content)) {
        response.content.forEach((item: any) => {
          // Remove 'content:' prefix from keys
          const key = item.key.replace('content:', '');
          contentData[key] = item.value;
        });
      }
      
      // If no content exists, use defaults (but don't save yet)
      if (Object.keys(contentData).length === 0) {
        console.log('✓ No content in database - using defaults');
        setContent(DEFAULT_CONTENT);
      } else {
        console.log('✓ Loaded content from database');
        setContent(contentData);
      }
    } catch (error) {
      // On error (backend not available), use defaults - this is expected in preview
      console.log('✓ Preview mode - using default content');
      setContent(DEFAULT_CONTENT);
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaults = async () => {
    try {
      console.log('Initializing default content...');
      const authToken = getAuthToken();
      
      // If no auth token, just set defaults locally for display
      if (!authToken) {
        console.log('No auth token, setting defaults locally');
        setContent(DEFAULT_CONTENT);
        return;
      }

      // Save each default value to backend
      const entries = Object.entries(DEFAULT_CONTENT);
      let successCount = 0;
      let failCount = 0;
      
      for (const [key, value] of entries) {
        try {
          await apiClient.post('/content', { key, value }, true);
          successCount++;
        } catch (err) {
          console.error(`Failed to initialize ${key}:`, err);
          failCount++;
        }
      }
      
      console.log(`Initialized ${successCount} items, ${failCount} failed`);
      setContent(DEFAULT_CONTENT);
      
      if (failCount > 0) {
        throw new Error(`Some items failed to initialize (${failCount}/${entries.length})`);
      }
    } catch (error) {
      console.error('Initialize defaults error:', error);
      // Even if backend fails, set defaults locally
      setContent(DEFAULT_CONTENT);
      throw error;
    }
  };

  const updateContent = async (key: string, value: any) => {
    try {
      console.log(`Updating content: ${key} =`, value);
      
      // Optimistically update local state first
      setContent(prev => ({ ...prev, [key]: value }));
      
      // Try to update backend
      try {
        await apiClient.post('/content', { key, value }, true);
        console.log('Content updated successfully in backend');
      } catch (apiError) {
        console.error('Backend update failed, change saved locally only:', apiError);
        // Don't throw - we already updated locally
        // In preview mode, local updates are fine
      }
    } catch (error) {
      console.error('Update content error:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading, initializeDefaults }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};