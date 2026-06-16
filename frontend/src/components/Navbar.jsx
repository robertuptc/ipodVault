import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { token, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    return (
        <nav className="navbar sticky-top bg-white shadow-sm px-4 py-2">
            <Link className="nav-link" to="/inventory">
                <span className="navbar-brand fw-bold">
                🎧 ipodVault
                </span>
            </Link>

            <div className="ms-auto d-flex align-items-center gap-4">
                <NavLink to={"/inventory"} className={({isActive}) => `nav-link ${isActive ? "fw-bold text-primary" : "text-muted"}`}>Inventory</NavLink>
                <NavLink to={"/"} className={({isActive}) => `nav-link ${isActive ? "fw-bold text-primary" : "text-muted"}`}>Dashboard</NavLink>
                <NavLink to={"/models"} className={({isActive}) => `nav-link ${isActive ? "fw-bold text-primary" : "text-muted"}`}>Models</NavLink>

                {/* Dropdown Menu */}
                {token && (
                    <div className="dropdown">
                        <button 
                            className="btn btn-light border dropdown-toggle d-flex align-items-center gap-2"
                            data-bs-toggle="dropdown"
                        >
                            <i className="bi bi-person-circle"></i>
                            {user?.username ? `Hi ${user.username}` : "Account"}
                        </button>
                        
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                            <li>
                                <button 
                                    className="dropdown-item text-danger d-flex align-items-center gap-2"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                    Logout
                                </button>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/profile">
                                Profile</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;