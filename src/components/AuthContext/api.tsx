import axios from 'axios';
import axiosInstance from "./axiosInstance";

interface LoginCredentials {
  username: string;
  password: string;
}

interface AccountData {
  names: string;
  email: string;
  district: string;
  sector: string;
  telephone: string;
  username: string;
  password: string;
  profile_picture?: string;
}

interface ProductDetails {
  name: string;
  price: number;
  stock_quantity: number;
  unit: string;
  minimum_for_deliver: number;
  description: string;
  owner_id: number;
}

interface SingleProductParams {
  name: string;
}

interface LoginResponse {
  message: string;
  User: string;
  access: string;
  refresh: string;
}

// interface ApiError {
//   message: string;
//   status: number;
//   code?: string;
// }

const API_ROUTES = {
  LOGIN: 'bea/login/',
  LOGOUT: 'bea/logout/',
  CREATE_SELLER: 'bea/create-seller/',
  PRODUCT: 'poli/product/',
  PRODUCTS: 'poli/products'
} as const;

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw error;
};

const login = async (credentials: LoginCredentials): Promise<LoginResponse | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, credentials);
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

const logout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    await axiosInstance.post(API_ROUTES.LOGOUT, { refresh: refreshToken }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

  
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    console.log('Logout successful');
    
  } catch (error) {
    handleApiError(error);
    throw new Error('Logout failed');
  }
};

const createAccount = async (accountData: AccountData): Promise<any | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CREATE_SELLER, accountData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

const upload = async (productDetails: ProductDetails, token: string): Promise<any | undefined> => {
  try {
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await axiosInstance.post(
      API_ROUTES.PRODUCT, 
      productDetails,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

const singleProduct = async (params: SingleProductParams): Promise<ProductDetails | undefined> => {
  try {
    const response = await axiosInstance.get(API_ROUTES.PRODUCTS, {
      params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

export default { login, logout, createAccount, upload, singleProduct };
