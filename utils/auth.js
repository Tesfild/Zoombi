import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/usuarios/";

export const registerUser = async (email, password, username) => {
    try {
        const response = await axios.post(`${API_URL}register`, {email, password, username},
            {withCredentials: true}    
        )
        return response.data;      
    }
    catch (e) {
        throw new Error("Cadastro não concluído.")
    }

}

export const loginUser = async (email, password) => {

}

export const logoutUser = async (params) => {

}