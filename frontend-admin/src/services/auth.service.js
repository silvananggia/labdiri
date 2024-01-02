import axios from "../api/axios";
import authHeader from "./auth-header";


const register = (name, email,organisasi,
    akses,
    idlab,) => {
    return axios.post("/register", {
        name,
        email,
        organisasi,
        akses,
        idlab,
    });
};

const login = (username, password) => {
    return axios.post("/login", {
        username,
        password,
    });
};



const checkAuth = (id) => {
    return axios.get(`/get-user/${id}`, { headers: authHeader() });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post("/logout", {}, { headers: authHeader() });
};

const authService = {
    register,
    login,
    logout,
    checkAuth,
  };
  
  export default authService;