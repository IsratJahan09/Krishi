// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// Get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set user in localStorage
export const setUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// API request helper
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    ...options.headers,
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Add Content-Type for JSON requests (not for FormData)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'Request failed');
  }
  
  return response.json();
};

// Authentication APIs
export const authAPI = {
  register: async (data: {
    phone_number: string;
    name: string;
    password: string;
    role?: string;
    language?: string;
  }) => {
    const response = await apiRequest('/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Save tokens and user
    if (response.tokens) {
      setAuthToken(response.tokens.access);
      localStorage.setItem('refresh_token', response.tokens.refresh);
    }
    if (response.user) {
      setUser(response.user);
    }
    
    return response;
  },
  
  login: async (phone_number: string, password: string) => {
    const response = await apiRequest('/login/', {
      method: 'POST',
      body: JSON.stringify({ phone_number, password }),
    });
    
    // Save tokens and user
    if (response.tokens) {
      setAuthToken(response.tokens.access);
      localStorage.setItem('refresh_token', response.tokens.refresh);
    }
    if (response.user) {
      setUser(response.user);
    }
    
    return response;
  },
  
  logout: () => {
    removeAuthToken();
  },
  
  getProfile: async () => {
    return apiRequest('/profile/');
  },
};

// Scan APIs
export const scanAPI = {
  scan: async (imageFile: File) => {
    console.log('[API] Preparing scan request');
    console.log('[API] Image file:', imageFile.name, imageFile.size, 'bytes');
    console.log('[API] API URL:', API_BASE_URL);
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    console.log('[API] FormData created, sending request to /scan/');
    const result = await apiRequest('/scan/', {
      method: 'POST',
      body: formData,
    });
    
    console.log('[API] Scan response received:', result);
    return result;
  },
  
  getHistory: async () => {
    console.log('[API] Fetching history from /history/');
    const result = await apiRequest('/history/');
    console.log('[API] History response:', result);
    return result;
  },
  
  deleteAllHistory: async () => {
    console.log('[API] Deleting all history from /history/');
    const result = await apiRequest('/history/', {
      method: 'DELETE',
    });
    console.log('[API] Delete response:', result);
    return result;
  },
};

// Batch APIs
export const batchAPI = {
  getAll: async () => {
    console.log('[API] Fetching all batches from /batches/');
    const result = await apiRequest('/batches/');
    console.log('[API] Batches response:', result);
    return result;
  },
  
  create: async (batchData: {
    crop_type: string;
    weight: number;
    harvest_date: string;
    division: string;
    district: string;
    storage_type: string;
  }) => {
    console.log('[API] Creating batch:', batchData);
    const result = await apiRequest('/batches/', {
      method: 'POST',
      body: JSON.stringify(batchData),
    });
    console.log('[API] Batch created:', result);
    return result;
  },
  
  update: async (batchId: string, batchData: any) => {
    console.log('[API] Updating batch:', batchId, batchData);
    const result = await apiRequest(`/batches/${batchId}/`, {
      method: 'PUT',
      body: JSON.stringify(batchData),
    });
    console.log('[API] Batch updated:', result);
    return result;
  },
  
  delete: async (batchId: string) => {
    console.log('[API] Deleting batch:', batchId);
    const result = await apiRequest(`/batches/${batchId}/`, {
      method: 'DELETE',
    });
    console.log('[API] Batch deleted:', result);
    return result;
  },
};
