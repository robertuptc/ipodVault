function InventoryForm({ formData, handleChange, isMarkedAsSold }) {

    return (
        <>
            <div className="row g-3">
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            name="color"
                            value={formData ? formData.color || "" : ""}
                            onChange={handleChange}
                            />
                        <label className="form-label">Color</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="storage_gb"
                            value={formData ? formData.storage_gb || "" : ""}
                            onChange={handleChange}
                            />
                        <label className="form-label">Storage</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="condition"
                            value={formData ? formData.condition || "" : ""}
                            onChange={handleChange}
                            />
                        <label className="form-label">Condition</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="purchase_price"
                            value={formData ?formData.purchase_price || "" : ""}
                            onChange={handleChange}
                            />
                        <label className="form-label">Purchase Price</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <select
                            className="form-select mb-2"
                            name="status"
                            value={formData ? formData.status || "" : ""}
                            onChange={handleChange}
                            >
                            <option value="ACTIVE">Active</option>
                            <option value="FOR_SALE">For Sale</option>
                            <option value="SOLD">Sold</option>
                            <option value="PERSONAL">Personal Collection</option>
                            <option value="DAMAGED">Damaged</option>
                        </select>
                        <label className="form-label">Status</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="sale_price"
                            value={formData ? formData.sale_price || "" : ""}
                            onChange={handleChange}
                            disabled={isMarkedAsSold}
                            
                            />
                        <label className="form-label">Sale Price</label>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        name="notes"
                        style={{ height: "100px" }}
                        value={formData ? formData.notes || "" : ""}
                        onChange={handleChange}
                        >
                    </textarea>
                    <label className="form-label">Notes</label>
                </div>
            </div>
        </>
    );
};

export default InventoryForm