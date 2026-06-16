

function DeviceInfo({ device, mode }) {
    return (
            // Device Info
            <div className="modal-section mb-4">
                <h6 className="text-muted border-bottom pb-2 mb-3">
                    Device Information
                </h6>

                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <small className="text-muted">Inventory ID</small>
                        <div className="fw-semibold">{device.id}</div>
                    </div>

                    <div className="col-md-6">
                        <small className="text-muted">Release Year</small>
                        <div className="fw-semibold">{device.release_year}</div>
                    </div>

                    <div className="col-md-6">
                        <small className="text-muted">Status</small>
                        <div>
                            <span className={`badge ${
                                device.status === "FOR_SALE"
                                ? "bg-success"
                                : device.status === "SOLD"
                                ? "bg-secondary"
                                : device.status === "PERSONAL"
                                ? "bg-warning text-dark"
                                : device.status === "DAMAGED"
                                ? "bg-danger"
                                : "bg-dark"
                            }`}
                            >
                                {device.status_display}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <small className="text-muted">Created</small>
                        <div className="fw-semibold">
                            {new Date(device.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

    );

};
export default DeviceInfo