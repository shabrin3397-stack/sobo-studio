import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-99b74b48`;

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('sobo_admin_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string) => {
  localStorage.setItem('sobo_admin_token', token);
};

// Clear auth token
export const clearAuthToken = () => {
  localStorage.removeItem('sobo_admin_token');
};

// Check if we're in a preview/development environment
const isPreviewMode = () => {
  return !projectId || projectId === 'your-project-id';
};

// API client with auth headers
export const apiClient = {
  get: async (endpoint: string, useAuth = false) => {
    // In preview mode without backend, throw immediately
    if (isPreviewMode()) {
      throw new Error('Backend not available in preview mode');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useAuth ? getAuthToken() : publicAnonKey}`
    };
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(error.error || 'Request failed');
      }

      return response.json();
    } catch (error) {
      // Suppress logging for expected preview mode errors
      if (error instanceof Error && !error.message.includes('preview mode')) {
        console.error('API Error:', error);
      }
      throw error;
    }
  },

  post: async (endpoint: string, body: any, useAuth = false) => {
    // In preview mode without backend, throw immediately
    if (isPreviewMode()) {
      throw new Error('Backend not available in preview mode');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${useAuth ? getAuthToken() : publicAnonKey}`
    };

    console.log('API POST Request:', `${API_BASE}${endpoint}`, body);

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(error.error || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  upload: async (file: File) => {
    // In preview mode without backend, throw immediately
    if (isPreviewMode()) {
      throw new Error('Backend not available in preview mode - please deploy to enable image uploads');
    }

    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${getAuthToken()}`
    };

    console.log('API Upload Request:', `${API_BASE}/upload`);

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
        throw new Error(error.error || 'Upload failed');
      }

      return response.json();
    } catch (error) {
      console.error('API Upload Error:', error);
      throw error;
    }
  }
};