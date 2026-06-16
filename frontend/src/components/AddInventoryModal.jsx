import { useState } from "react";
import API from "../services/api";
import { API_BASE_URL } from "../services/api";
// Components
import DeviceInfo from "./DeviceInfo";
import DevicePreview from "./DevicePreview";
import Modal from "./Modal";
import InventoryForm from "./InventoryForm";
// Services
import { createInventory } from "../services/inventoryService";

function AddInventoryModal({ refreshInventory, devices, onClose }) {

    const [formData, setFormData] = useState({
        device: "",
        color: "",
        storage_gb: "",
        condition: "",
        purchase_price: "",
        notes: "",
        status: "ACTIVE"
    });

    const [selectedDevice, setSelectedDevice] = useState(null);

    
    const handleChange = (e) => {
        
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        
        if (name === "device") {
            const deviceId = Number(value)

            const device = Object.values(devices)
                .flat()
                .find(d => d.id === deviceId)
                
            setSelectedDevice({
                ...device,
                device_image: `${API_BASE_URL}${device.image}`,
                ipod_model_display: device.name
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        createInventory(formData)
            .then(() => {
                refreshInventory();
                setFormData({
                    device: "",
                    color: "",
                    storage_gb: "",
                    condition: "",
                    purchase_price: "",
                    notes: "",
                    status: "ACTIVE"
                });
                onClose()
            })
            .catch(err => {
                console.log(err.response.data)
            });
    };
    // console.log(devices)
    return (
            <Modal onClose={onClose}>

                {/* Modal Header */}
                {!selectedDevice &&  (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Add Iventory Item</h4>
                            <button 
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>

                            <select className="form-select mb-2"
                                name="device"
                                value={formData.device}
                                onChange={handleChange}
                                required
                                >
                                <option value="">Select Model</option>
                                {Object.entries(devices).map(([family, items])=> (
                                    items.map(ipod => (
                                        <option key={ipod.id} value={ipod.id}>
                                            {ipod.name}
                                        </option>
                                        ))
                                    ))
                                }
                            </select>
                    </>

                )}


                {/* Form */}
                {selectedDevice && (
                    <>
                    
                        <DevicePreview device={(selectedDevice)}/>
                        
                        <DeviceInfo device={selectedDevice} mode={"addingNewDevice"}/>

                        <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
                            <InventoryForm formData={formData} handleChange={handleChange}/>
                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button className="btn btn-primary">Save</button>
                                <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={onClose}
                                        >
                                        Cancel
                                    </button>
                            </div>
                        </form>
                    </>
                )}
            </Modal>
    );
}

export default AddInventoryModal;