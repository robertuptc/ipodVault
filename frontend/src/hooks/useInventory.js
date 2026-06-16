import { useEffect, useState } from "react";
// Services
import { deleteInventoryItem, getInventory } from "../services/inventoryService";

function useInventory() {

    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInventory = () => {
        // API call to get inventory
        getInventory()
            .then(res => setInventoryItems(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };
    
    const deleteItem = (id) => {
        if (!window.confirm("Delete this item?")) return;

        deleteInventoryItem(id)
            .then(() => fetchInventory())
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchInventory()
    }, [])

    return {
        inventoryItems,
        fetchInventory,
        deleteItem,
        loading
    }
};

export default useInventory;