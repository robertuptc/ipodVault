function DevicePreview({ device }) {
    
    if (!device) return null;
    
    return (
            // {/* LEFT SIDE */}
            <div className="d-flex gap-3 align-items-center">
                {device.device_image && (
                    <img
                        src={device.device_image}
                        alt={device.ipod_model_display}
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain"
                        }}
                    />
                )}
                <div>
                    <h4 className="mb-1">{device.device_name}</h4>
                </div>
            </div>
    );
};

export default DevicePreview;