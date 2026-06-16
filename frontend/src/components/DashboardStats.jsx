function DashboardStats({ totalItems, totalForSale, totalSold, formattedProfit, devices, ownedDeviceIds }) {

    const collectionStats = Object.entries(devices).map(([family, items]) => {
        const total = items.length;

        const owned = items.filter(ipod => 
            ownedDeviceIds.has(ipod.id)
        ).length
        // console.log(">>>OWNED", owned)
        return {family, owned, total}
    });

    const totalModels = Object.values(devices)
        .flat()
        .length;

    return (
        <div className="row g-3 mb-4">

            <div className="col-md-3">
                <div className="stat-card">

                    <div className="stat-icon bg-primary">
                        <i className="bi bi-hdd-stack"></i>
                    </div>

                    <div>
                        <div className="stat-label">Total Inventory</div>
                        <div className="stat-value">{totalItems}</div>
                    </div>

                </div>
            </div>


            <div className="col-md-3">
                <div className="stat-card">

                    <div className="stat-icon bg-success">
                        <i className="bi bi-tag"></i>
                    </div>

                    <div>
                        <div className="stat-label">For Sale</div>
                        <div className="stat-value">{totalForSale}</div>
                    </div>

                </div>
            </div>


            <div className="col-md-3">
                <div className="stat-card">

                    <div className="stat-icon bg-secondary">
                        <i className="bi bi-box"></i>
                    </div>

                    <div>
                        <div className="stat-label">Sold</div>
                        <div className="stat-value">{totalSold}</div>
                    </div>

                </div>
            </div>


            <div className="col-md-3">
                <div className="stat-card">

                    <div className="stat-icon bg-warning">
                        <i className="bi bi-graph-up"></i>
                    </div>

                    <div>
                        <div className="stat-label">Profit</div>
                        <div className="stat-value">{formattedProfit}</div>
                    </div>

                </div>
            </div>


            {/* Collection Bars Progress */}
            <div className="card shadow-sm p-4 mb-4">

                <h5 className="mb-3">Collection Progress</h5>
                
                {collectionStats.map(stat => {
                    
                    const percent = (stat.owned / stat.total) * 100
                    
                    return (
                        <div key={stat.family} className="mb-3">
                            <div className="d-flex justify-content-between">
                                <strong>{stat.family}</strong>
                                <span>{stat.owned} / {stat.total}</span>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${percent}%`}}
                                >

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            

            <div className="card shadow-sm p-4 mb-4">
                <div className="d-flex justify-content-between mb-1">
                    <strong>Total Collection</strong>
                    <span>{ownedDeviceIds.size} / {totalModels}</span>
                </div>

                <div className="progress">
                    <div
                    className="progress-bar bg-primary"
                    style={{ width: `${(ownedDeviceIds.size / totalModels) * 100}%` }}
                    />
                </div>

            </div>
        </div>
    )
}

export default DashboardStats