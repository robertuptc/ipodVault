import { useAuth } from "../context/AuthContext";

function Profile() {
    
    const { user, logout } = useAuth();

    return (
        <>
            <h2 className="mb-4">
                Welcome back, {user?.username.charAt(0).toUpperCase() + user?.username.slice(1) || "User"} 👋🏼
            </h2>

            <div className="card p-4 shadow-sm">

                {/* Header (Avatar + name) */}
                <div className="d-flex align-items-center gap-3 mb-4">
                    {/* Avatar */}
                    <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{
                            width: "50px",
                            height: "50px",
                            fontSize: "20px",
                            fontWeight: "bold"
                        }}
                    >
                        {user?.username 
                            ? user?.username.charAt(0).toUpperCase()
                            : "U"
                        }
                    </div>
                    <div>
                        <h4 className="mb-0">{user?.username}</h4>
                        <small className="text-muted">{user?.email}</small>
                    </div>
                </div>
                
                {/* Account Info */}
                <div className="mb-4">
                    <h6 className="text-muted border-bottom pb-2">
                    Account Info
                    </h6>

                    <div className="mt-3">
                        <strong>User ID:</strong>{" "}
                        {user?.user_id || "Unknown"}
                    </div>

                    <div className="mt-2">
                        <strong>Email:</strong>{" "}
                        {user?.email || "Unknown"}
                    </div>
                </div>

                {/* Actions */}
                <div>
                    <h6 className="text-muted border-bottom pb-2">
                        Actions
                    </h6>
                </div>
                
                <div className="mt-3">
                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;