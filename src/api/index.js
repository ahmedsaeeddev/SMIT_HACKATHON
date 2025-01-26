import { Api_client } from "./axios";


const getRequest = async(path) =>{
    try {
        const response = await Api_client.get(path)
        return response.data 
    } catch (error) {
        console.log(error , "Error getting")
    }
    
}

const postRequest = async(path , data) =>{
    try {
        const response = await Api_client.post(path, data)
        return response.data 
    } catch (error) {
        console.log(error , "Error getting")
    }
    
}

const putRequest = async(path , data) =>{
    try {
        const response = await Api_client.put(path, data)
        return response.data 
    } catch (error) {
        console.log(error , "Error getting")
    }
    
}

const deleteRequest = async(path,data) =>{
    try {
        const response = await Api_client.delete(path, data)
        return response.data 
    } catch (error) {
        console.log(error , "Error getting")
    }
    
}

export {getRequest , getResponse , postRequest , deleteRequest}