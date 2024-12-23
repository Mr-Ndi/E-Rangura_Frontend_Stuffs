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
  access: string;   // Access token
  refresh: string;  // Refresh token
}

// API routes as constants
const API_ROUTES = {
  LOGIN: 'bea/login/',
  LOGOUT: 'bea/logout/',
  CREATE_SELLER: 'bea/create-seller/',
  PRODUCT: 'poli/product/',
  PRODUCTS: 'poli/products'
} as const;


// Error handling function
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw error; // Handle non-Axios errors
};

// Login function to authenticate user and store tokens
const login = async (credentials: LoginCredentials): Promise<LoginResponse | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, credentials);
    localStorage.setItem('token', response.data.access);          // Store access token
    localStorage.setItem('refreshToken', response.data.refresh); // Store refresh token
    return response.data; // Return response data for further use
  } catch (error) {
    handleApiError(error);
    return undefined; // Return undefined on error
  }
};

// Logout function to clear tokens and notify the server
const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('token');

    // Check if the refresh token exists
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Send a logout request to the server
    await axiosInstance.post(API_ROUTES.LOGOUT, 
      { refresh: refreshToken }, // Send the refresh token in the request body
      {
        headers: {
          'Authorization': `Bearer ${accessToken}` // Include the access token in the Authorization header
        }
      }
    );

    // Clear tokens from local storage after successful logout
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    console.log('Logout successful'); // Log success message or handle as needed
  } catch (error) {
    handleApiError(error); // Handle any errors that occur during logout
    throw new Error('Logout failed');
  }
};
// Create account function for registering new users
const createAccount = async (accountData: AccountData): Promise<any | undefined> => {
  try {
    const response = await axiosInstance.post(API_ROUTES.CREATE_SELLER, accountData);
    return response.data; // Return response data for further use
  } catch (error) {
    handleApiError(error);
    return undefined; // Return undefined on error
  }
};

// Upload product function with access token management
const upload = async (productDetails: ProductDetails): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem('token'); // Retrieve access token from local storage
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await axiosInstance.post(
      API_ROUTES.PRODUCT, 
      productDetails,
      {
        headers: {
          'Authorization': `Bearer ${token}` // Use the stored access token for authentication
        }
      }
    );
    
    return response.data; // Return response data for further use
    
  } catch (error) {
    handleApiError(error);
    return undefined; // Return undefined on error
  }
};

// Fetch single product details with access token management
const singleProduct = async (params: SingleProductParams): Promise<ProductDetails | undefined> => {
  try {
    const token = localStorage.getItem('token'); // Retrieve access token from local storage
    
    const response = await axiosInstance.get(API_ROUTES.PRODUCTS, {
      params,
      headers: {
        'Authorization': `Bearer ${token}` // Use the stored access token for authentication
      }
    });
    
    return response.data; // Return response data for further use
    
  } catch (error) {
    handleApiError(error);
    return undefined; // Return undefined on error
  }
};

// Exporting the functions for use in other parts of the application
export default { login, logout, createAccount, upload, singleProduct };
