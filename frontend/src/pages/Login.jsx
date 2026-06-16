import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login, token } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    useEffect(() => {
        // auto redirect if already logged in
        if (token) {
            navigate("/inventory");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevents double submit (double clicking)
        if (loading) return;

        setLoading(true);
        setError("");

        // if succesful login redirect
        const result = await login(username, password, rememberMe);
        if (result.success) {
            navigate("/inventory");

        } else {
            setError(result.error)
        }
        setLoading(false);
    };

    const isFormValid = username.trim() && password.trim();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "350px"}}>

            <h3 className="text-center mb-3">Login</h3>

            {error && (
                <div className="alert alert-danger py-2"> {error} </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control mb-3"
                    autoComplete="username"
                    autoFocus
                />

                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mb-3"
                    autoComplete="current-password"
                />

                {/* Remember Me Checkbox */}
                <div className="form-check mb-3">
                    <input 
                        type="checkbox" 
                        className="form-check-input"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe" className="form-check-label">
                        Remember Me
                    </label>
                </div>

                <button 
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading || !isFormValid}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                        "Login"
                    )}
                </button>
                <input type="submit" hidden/>
            </form>
            
            </div>
        </div>
    );
}

export default Login;