import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/usuarios/";

export const registerUser = async (email, password, username) => {

    try {
        const response = await axios.post(`${API_URL}register/`, {email, password, username},
            {withCredentials: true}    
        )
        return response.data;      
    }
    catch (e) {
        throw new Error("Cadastro não concluído.")
    }

}

export const loginUser = async (email, password) => {

    try {
        const response = await axios.post(`${API_URL}login/`, {email, password},
            {withCredentials: true}    
        )
        return response.data;      
    }
    catch (e) {
        throw new Error("Login não concluído.")
    }

}

export const logoutUser = async () => {

    try {
        const response = await axios.post(`${API_URL}logout/`, null,
            {withCredentials: true}    
        )
        return response.data;      
    }
    catch (e) {
        throw new Error("Logout não concluído.")
    }

}