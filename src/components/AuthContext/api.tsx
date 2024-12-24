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

interface ProductResponse {
  message: string;
  products: Array<{
    product_id: number;
    name: string;
    price: number;
    stock_quantity: number;
    unit: string;
    minimum_for_deliver: number;
    description: string;
    owner_id: number;
    created_at: string;
  }>
}

interface OrderDetails {
  product_id: number;
  quantity: number;  
}

interface OrderResponse {
  message: string;
  order_id: number;  
}

interface UserOrdersResponse {
  message: string;
  orders: Array<{
    order_id: number;
    product_id: number;
    quantity: number;  
    total_price: string;
    status: string;    
    created_at: string;
    updated_at: string;
  }>
}
interface LoginResponse {
  message: string;
  User: string;        
  access: string;      
  refresh: string;     
}
interface FilteredOrdersResponse {
  message: string;
  orders: Array<{
    order_id: number;
    product_id: number; // ID of the ordered product
    quantity: number;   // Quantity ordered
    total_price: string; // Total price of the order
    status: string;     // Status of the order
    created_at: string; // Creation timestamp
    updated_at: string; // Last updated timestamp
  }>
}
const API_ROUTES = {
  LOGIN: 'bea/login/',
  LOGOUT: 'bea/logout/',
  CREATE_SELLER: 'bea/create-seller/',
  PRODUCT: 'poli/product/',
  PRODUCTS: 'poli/products',
  CREATE_ORDER: 'orders/create/',         
  USER_ORDERS: 'orders/',         
  FILTERED_USER_ORDERS: 'orders/filter/'         
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

const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('token');

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    await axiosInstance.post(API_ROUTES.LOGOUT, 
      { refresh: refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

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

const upload = async (productDetails: ProductDetails): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem('token');
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

const singleProduct = async (params?: any): Promise<ProductResponse> => {
  try {
      const response = await axiosInstance.get<ProductResponse>(API_ROUTES.PRODUCTS + '/', { params });
      return response.data;
  } catch (error) {
      handleApiError(error);
      throw error;
  }
};

const createOrder = async (orderDetails: OrderDetails): Promise<OrderResponse | undefined> => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await axiosInstance.post(
      API_ROUTES.CREATE_ORDER,
      orderDetails,
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

const retrieveUserOrders = async (): Promise<UserOrdersResponse | undefined> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token is required');
    }

    const response = await axiosInstance.get(API_ROUTES.USER_ORDERS, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;

  } catch (error) {
    handleApiError(error);
    return undefined;
  }
};

const filterUserOrders = async (status?: string): Promise<FilteredOrdersResponse | undefined> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Authentication token is required');
    }

   const response = await axiosInstance.get(API_ROUTES.FILTERED_USER_ORDERS, { 
     headers: { 'Authorization': `Bearer ${token}` },
     params: { status }
   });

   return response.data;

 } catch (error) {
   handleApiError(error);
   return undefined;
 }
};

export default { 
   login, 
   logout, 
   createAccount, 
   upload, 
   singleProduct,
   createOrder,         
   retrieveUserOrders,  
   filterUserOrders     
};
