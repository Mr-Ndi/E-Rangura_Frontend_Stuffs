import axiosInstance from "./axiosInstance";

const login = async (credentials) =>{
    try{
        const response = await axiosInstance.post('bea/login/', credentials)
        return response.data;
    } catch(error){
        throw error;
    }
}

const createAccount = async(accountData) => {
    try{
        const response = await axiosInstance.post('bea/create-seller/', accountData)
        return response.data;
    }catch(error){
        throw error
    }
};

const upload = async(productDetails) => {
    try{
        const response = await axiosInstance.post('poli/product/', productDetails)
        return response.data;
    }catch(error){
        throw error
    }
}

const singleProduct = async(name) =>{
    try{
        const response = await axiosInstance.get('/poli/products', name)
        return response.data
    }catch(error){
        throw error
    }
}
export default {login, createAccount, upload, singleProduct}