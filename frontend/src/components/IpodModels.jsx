// import { useRef } from "react";
import ModelDetailsModel from "./ModelDetailsModal";
import { API_BASE_URL } from "../services/api";
function IpodModels({ devices, onSelectModel, selectedModel, ownedDeviceIds }) {

    if (!devices || Object.keys(devices).length === 0) {
        return null;
    }

    return (
        <>
            {Object.entries(devices).map(([family, items]) => {

                return (
                    <div key={family} className="model-family">
                        
                        <div className="model-family-header">
                            <h4>{family}</h4>
                        </div>

                        <div className="model-slider">

                            {items.length === 0 ? (
                                <p>No ipods found</p>
                            ) : (
                                items.map(ipod => (
                                    <div className="model-card" key={ipod.id}>
                                        <div 
                                            className="model-card"
                                            onClick={() => onSelectModel(ipod)}
                                            style={{ cursor: "pointer"}}
                                        >
                                            {ipod.image && (
                                                <img 
                                                    src={`${API_BASE_URL}${ipod.image}`}
                                                    className="card-img-top" 
                                                    alt={ipod.name}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.src = "/placeholder-ipod.png"
                                                    }}
                                                />
                                            )}
                                            <div className="model-title">
                                                {ipod.name}
                                            </div>
                                            {
                                                ownedDeviceIds.has(ipod.id) && (
                                                    <div className="owned-badge">✔ Owned</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )
            })}
            
            {selectedModel && (
                <ModelDetailsModel
                    model={selectedModel}
                    onClose={() => onSelectModel(null)}
                />
            )}
            
        </>
    );
}

export default IpodModels;
