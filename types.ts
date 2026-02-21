export type Page = 'landing' | 'login' | 'dashboard' | 'admin' | 'settings';
export type UserRole = 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tariff: string;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export type RequestStatus = 'new' | 'in-progress' | 'completed' | 'cancelled';

export interface ProcurementRequest {
  id: string;
  date: string;
  categories: string[];
  productName: string;
  quantity: string;
  deadline: string;
  status: RequestStatus;
  comment?: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'error' | 'success' | 'warning';
}

export interface Tariff {
  id: string;
  name: string;
  price: string;
  limits: string;
}