import { useState } from "react";

function InventoryTable({ inventoryItems, onSelectItem, statusFilter, onChangeFilter, searchTerm, debouncedSearch, onSearch, onDelete, setShowAddModal }) {
    
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    let filteredItems = inventoryItems
        .filter(item => 
            statusFilter === "ALL" ? true : item.status === statusFilter
        ).filter (item => 
            item.color.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            item.condition.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            item.device_name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

    if (sortField) {
        filteredItems = [...filteredItems].sort((a, b) => {

            let valueA = a[sortField];
            let valueB = b[sortField];

            if (valueA === null) return 1;
            if (valueB === null) return -1;

            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
            if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;

            return 0;
        });
    }
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc")
        }
    }

    const statusColors = {
        ACTIVE: "bg-dark",
        FOR_SALE: "bg-success",
        SOLD: "bg-secondary",
        PERSONAL: "bg-warning text-dark",
        DAMAGED: "bg-danger"
    };

    // >>>>>NOTE: this is to show the arrows on the table for sorting. work on this later
    const renderSortArrow = (field) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? " ▲" : " ▼";
    };
    
    return (
        <>
        <div className="card shadow-sm mt-4">
            <div className="card-body">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mtb-0">
                        Inventory
                        <span className="text-muted ms-2" style={{ fontSize: "0.9rem"}}>
                            ({filteredItems.length})
                        </span>
                    </h5>

                    <button 
                        className="btn btn-primary d-flex align-items-center gap-2"
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Item
                    </button>
                </div>

                {/* SEARCH + FILTER */}
                <div className="row g-2 mb-3">
                    
                    {/* SEARCH */}
                    <div className="col-md-8">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search by color, model, condition..." 
                            value={searchTerm} 
                            onChange={(e) => onSearch(e.target.value)} 
                        />
                    </div>

                    {/* DROPDOWN UI */}
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => onChangeFilter(e.target.value)}
                        >
                            <option value="ALL">All Items</option>
                            <option value="ACTIVE">Active</option>
                            <option value="FOR_SALE">For Sale</option>
                            <option value="SOLD">Sold</option>
                            <option value="PERSONAL">Personal Collection</option>
                            <option value="DAMAGED">Damaged</option>
                        </select>
                    </div>

                </div>
            
                {/* TABLE */}
                {inventoryItems.length === 0 ? (
                    <div className="text-center py-5">
                        <h6 className="text-muted mb-3">No Inventory Items</h6>
                        <p className="text-muted mb-0">
                            Use the <strong>"Add Item"</strong> button above to get started
                        </p>
                    </div>
                    ) : (
                    <div className="table-responsive table-container">
                        <table className="table table-striped table-hover shadow-sm">
                        <thead className="table-light text-uppercase small">
                        <tr>
                            <th>ID</th>
                            <th 
                                style={{cursor: "pointer"}} 
                                onClick={() => handleSort("device_name")}
                            >
                                Model
                            </th>
                            <th>Color</th>
                            <th 
                                style={{cursor: "pointer"}} 
                                onClick={() => handleSort("storage_gb")}
                            >
                                Storage
                            </th>
                            <th 
                                style={{cursor: "pointer"}} 
                                onClick={() => handleSort("condition")}
                            >
                                Condition
                            </th>
                            <th>Status</th>
                            <th 
                                style={{cursor: "pointer"}} 
                                onClick={() => handleSort("profit")}
                            >
                                Profit
                            </th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="align-middle" style={{ cursor: "pointer"}} onClick={() => {onSelectItem(item)}}>
                                <td className="text-nowrap">{item.id}</td>
                                <td className="text-nowrap fw-semibold">{item.device_name}</td>
                                <td className="text-nowrap">{item.color}</td>
                                <td className="text-nowrap">
                                    <span className="badge bg-light text-dark">
                                    {item.storage_gb} GB
                                    </span>
                                </td>
                                <td className="text-nowrap">{item.condition}</td>
                                <td className="text-nowrap">
                                    <span className={`badge ${statusColors[item.status]}`}
                                    >
                                    {item.status_display}
                                    </span>
                                </td>
                                <td className="text-end fw-semibold" >{item.profit != null ? `$${item.profit}` : "-"}</td>
                                <td className="text-nowrap">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onSelectItem(item)
                                        }}
                                        >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDelete(item.id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    )}
            </div>
        </div>

        </>
    );
}

export default InventoryTable;
