import axios from "axios";

export const instance = axios.create({
  baseURL: "/api",
});

export const apiconnecter = async (method: string, url: string, data?: any, headers : any = {} ) => { 
    try{
        const response = await instance({
            method: method,
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json",
                ...headers
            }
        });

        console.log("API Response:", response.data);

        return response.data;
    }
    catch(err){

    }
}
