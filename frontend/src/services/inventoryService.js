import API from "./api";

// GET all inventory 
export const getInventory = () => {
    return API.get("api/inventory/");
};

// CREATE inventory item
export const createInventory = (data) => {
    return API.post("api/inventory/", data);
};

// UPDATE inventory item
export const updateInventoryItem = (id, data) => {
    return API.patch(`api/inventory/${id}/`, data);
};

// DELETE inventory item
export const deleteInventoryItem = (id) => {
    return API.delete(`api/inventory/${id}/`);
};

// GET all models
export const getAllModels = () => {
    return API.get("api/ipods/");
};