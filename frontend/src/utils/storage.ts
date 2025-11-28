/**
 * LocalStorage utilities for farmer and crop data management
 */

export interface Farmer {
  id: string;
  name: string;
  email?: string; // Optional - not used for authentication
  phone: string; // Primary identifier
  password: string; // In production, this should be hashed
  language: 'bangla' | 'english';
  createdAt: string;
  badges: string[];
}

export interface CropBatch {
  id: string;
  farmerId: string;
  cropType: string;
  weight: number;
  harvestDate: string;
  division: string;
  district: string;
  storageType: string;
  status: 'active' | 'completed';
  lossEvents: LossEvent[];
  createdAt: string;
}

export interface LossEvent {
  id: string;
  batchId: string;
  date: string;
  reason: string;
  amountLost: number;
  prevented: boolean;
}

// Storage keys
const FARMERS_KEY = 'krishi_farmers';
const BATCHES_KEY = 'krishi_batches';
const CURRENT_FARMER_KEY = 'krishi_current_farmer';

// Farmers
export const saveFarmer = (farmer: Farmer): void => {
  const farmers = getFarmers();
  const existingIndex = farmers.findIndex(f => f.id === farmer.id);
  
  if (existingIndex >= 0) {
    farmers[existingIndex] = farmer;
  } else {
    farmers.push(farmer);
  }
  
  localStorage.setItem(FARMERS_KEY, JSON.stringify(farmers));
};

export const getFarmers = (): Farmer[] => {
  const data = localStorage.getItem(FARMERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getFarmerById = (id: string): Farmer | null => {
  const farmers = getFarmers();
  return farmers.find(f => f.id === id) || null;
};

export const getFarmerByEmail = (email: string): Farmer | null => {
  const farmers = getFarmers();
  return farmers.find(f => f.email === email) || null;
};

export const getFarmerByPhone = (phone: string): Farmer | null => {
  const farmers = getFarmers();
  return farmers.find(f => f.phone === phone) || null;
};

// Current logged-in farmer
export const setCurrentFarmer = (farmerId: string): void => {
  localStorage.setItem(CURRENT_FARMER_KEY, farmerId);
};

export const getCurrentFarmer = (): Farmer | null => {
  const id = localStorage.getItem(CURRENT_FARMER_KEY);
  return id ? getFarmerById(id) : null;
};

export const clearCurrentFarmer = (): void => {
  localStorage.removeItem(CURRENT_FARMER_KEY);
};

// Crop Batches
export const saveBatch = (batch: CropBatch): void => {
  const batches = getBatches();
  const existingIndex = batches.findIndex(b => b.id === batch.id);
  
  if (existingIndex >= 0) {
    batches[existingIndex] = batch;
  } else {
    batches.push(batch);
  }
  
  localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
};

export const getBatches = (): CropBatch[] => {
  const data = localStorage.getItem(BATCHES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getBatchesByFarmer = (farmerId: string): CropBatch[] => {
  const batches = getBatches();
  return batches.filter(b => b.farmerId === farmerId);
};

export const getBatchById = (id: string): CropBatch | null => {
  const batches = getBatches();
  return batches.find(b => b.id === id) || null;
};

// Badges
export const addBadgeToFarmer = (farmerId: string, badge: string): void => {
  const farmer = getFarmerById(farmerId);
  if (farmer && !farmer.badges.includes(badge)) {
    farmer.badges.push(badge);
    saveFarmer(farmer);
  }
};

// Export functions
export const exportToJSON = (data: CropBatch[], filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (batches: CropBatch[], filename: string): void => {
  const headers = ['ID', 'Crop Type', 'Weight (kg)', 'Harvest Date', 'Division', 'District', 'Storage Type', 'Status'];
  const rows = batches.map(b => [
    b.id,
    b.cropType,
    b.weight,
    b.harvestDate,
    b.division,
    b.district,
    b.storageType,
    b.status
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
