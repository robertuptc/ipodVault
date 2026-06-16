import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import {jwtDecode} from "jwt-decode"

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Persisting the login, so token not lost when page refreshed
    const [token, setToken] = useState(
        localStorage.getItem("token") || sessionStorage.getItem("token")
    );
    
    const [user, setUser] = useState(null);
    
    // attach token on app load (globaly)
    useEffect(() => {
        if (token) {
            // Token attached to the API request
            API.defaults.headers.common["Authorization"] = `Bearer ${token}`

            try {
                // Deconding user from token
                const decoded = jwtDecode(token)
                setUser(decoded);

                // Check expiration
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    logout();
                }

            } catch(err) {
                console.error("Invalid token", err);
                setUser(null);
            }
        } else {
            setUser(null);
        }

    },[token])
    
    const login = async (username, password, rememberMe) => {
        try {
            const res = await API.post("api/auth/login/", {
                username,
                password
            });
            
            const accessToken = res.data.access
            setToken(accessToken);
            
            if (rememberMe) {
                localStorage.setItem("token", accessToken);
                sessionStorage.removeItem("token")
            } else {
                sessionStorage.setItem("token", accessToken);
                localStorage.removeItem("token")
            }
            
            return { success: true };
        } catch (err) {
            console.error("Login failed", err);

            const message =
                err.response?.data.detail ||
                err.response?.data.message ||
                "Login failed"

            return { 
                success: false,
                error: message
            }
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}