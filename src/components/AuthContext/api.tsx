import axiosInstance from "./axiosInstance";

interface LoginCredentials{
    username: string;
    password: string;
}
interface AccountData{
    names: string;
    email: string;
    district: string;
    sector: string;
    telephone: string;
    username: string;
    password: string;
    profile_picture?: string;
}
interface ProductDetails{
    name: string;
    price: number;
    stock_quantity: number;
    unit: string;
    minimum_for_deliver: number;
    description: string;
    owner_id: number;
}
interface SingleProductParams{
    name: string;
}
const login = async (credentials: LoginCredentials) =>{
    try{
        const response = await axiosInstance.post('bea/login/', credentials)
        return response.data;
    } catch(error){
        throw error;
    }
}

const createAccount = async(accountData: AccountData) => {
    try{
        const response = await axiosInstance.post('bea/create-seller/', accountData)
        return response.data;
    }catch(error){
        throw error
    }
};

const upload = async(productDetails: ProductDetails, token: string) => {
    try{
        const response = await axiosInstance.post('poli/product/', productDetails,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data;
    }catch(error){
        throw error
    }
}

const singleProduct = async(params: SingleProductParams):
Promise<ProductDetails> =>{
    try{
        const response = await axiosInstance.get('/poli/products',{
            params
        })
        return response.data
    }catch(error){
        throw error
    }
}
export default {login, createAccount, upload, singleProduct}