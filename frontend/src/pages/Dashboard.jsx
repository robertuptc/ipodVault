import DashboardStats from "../components/DashboardStats";

function Dashboard({
    totalItems,
    totalForSale,
    totalSold,
    formattedProfit,
    devices,
    ownedDeviceIds,
    inventoryItems
}) {

    const recentItems = [...inventoryItems]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)

    return (
        <>
            <h2 className="mb-4">Dashboard</h2>
            <DashboardStats
                totalItems = {totalItems}
                totalForSale = {totalForSale}
                totalSold = {totalSold}
                formattedProfit = {formattedProfit}
                devices={devices}
                ownedDeviceIds={ownedDeviceIds}
            />

            {/* Recent activity */}
            <div className="card shadow-sm p-4 mt-4">
                <h5 className="mb-3">Recent Activity</h5>

                {recentItems.length === 0 ? (
                    <p className="text-muted">No recent items</p>
                ) : (
                    <ul className="list-group list-group-flush">
                        {recentItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                                <div>
                                    <strong>{item.device_name}</strong>
                                    <div className="text-muted small">
                                        {item.color} • {item.storage_gb}GB
                                    </div>
                                </div>

                                <small className="text-muted">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Dashboard;