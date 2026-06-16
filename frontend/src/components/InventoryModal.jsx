import { useState, useEffect } from "react";
// Components
import DevicePreview from "./DevicePreview";
import DeviceInfo from "./DeviceInfo";
import InventoryForm from "./InventoryForm";
import Modal from "./Modal";
// Services
import { updateInventoryItem } from "../services/inventoryService";

function InventoryModal({ item, onClose, refreshInventory }) {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(item || {});

    useEffect(() => {
        setFormData(item);
        setIsEditing(false)
    }, [item]);
    
    // Enables/disables Sale price based on status
    const isMarkedAsSold = formData.status !== "SOLD"

    if (!item) return null;

    const handleChange = (e) => {

        const { name, value } = e.target

        // Pattern 1 preferred
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Pattern 2 ok but you could get a stale state bug (previous info overwritten by current one)
        // setFormData({
        //     ...formData,
        //     [name]: value
        // });
    };

    const handleSave = (e) => {
        e.preventDefault()
        
        updateInventoryItem(item.id, formData)
            .then(() => {
                refreshInventory();
                onClose();
            })
            .catch(err => {
                console.log(err)
                console.error(err)
            });
    };

    return (
                <Modal onClose={onClose}>

                    <div className="d-flex justify-content-between align-items-start gap-3 mb-4">

                        {/* Device modal Header */}
                        <DevicePreview device={item}/>
                        
                        {/* RIGHT SIDE */}
                        <div className="d-flex gap-2">
                            {!isEditing && (
                                <button
                                className="btn btn-outline-primary"
                                onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                className="btn-close"
                                onClick={onClose}
                                ></button>
                        </div>
                    </div>

                    {/* Device (Model) Info */}
                    <DeviceInfo device={item} />

                        {/* Inventory Details - VIEW Mode */}
                        {!isEditing && (
                            <div className="modal-section mb-4">
                            <h6 className="text-muted border-bottom pb-2 mb-3 mt-4">
                                Inventory Details
                            </h6>
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <small className="text-muted">Color</small>
                                    <div className="fw-semibold">{item.color}</div>
                                </div>

                                <div className="col-md-4">
                                    <small className="text-muted">Storage</small>
                                    <div className="fw-semibold">{item.storage_gb} GB</div>
                                </div>

                                <div className="col-md-4">
                                    <small className="text-muted">Condition</small>
                                    <div className="fw-semibold">{item.condition}</div>
                                </div>

                                <div className="col-md-4">
                                    <small className="text-muted">Purchase Price</small>
                                    <div className="fw-semibold">${item.purchase_price}</div>
                                </div>

                                <div className="col-md-4">
                                    <small className="text-muted">Sale Price</small>
                                    <div className="fw-semibold">
                                        {item.sale_price ? `$${item.sale_price}` : "-"}
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <small className="text-muted">Profit</small>
                                    <div className="fw-semibold text-success">
                                        {item.profit ? `$${item.profit}` : "-"}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <small className="text-muted">Notes</small>
                                    <div className="border rounded p-3 bg-light">
                                        {item.notes || "No notes"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}

                    {/* Inventory Details - EDIT Mode */}
                    {isEditing && (
                        <>
                            {isEditing && (
                                <span className="badge bg-warning text-dark mb-3">
                                    Editing Mode
                                </span>
                            )}

                            <form onSubmit={handleSave}>

                                <InventoryForm 
                                    formData={formData}
                                    handleChange={handleChange}
                                    isMarkedAsSold={isMarkedAsSold}
                                />

                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <button className="btn btn-primary">
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setIsEditing(false)}
                                        >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </Modal>
    )
};

export default InventoryModal;