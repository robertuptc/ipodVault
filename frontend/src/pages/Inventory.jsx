import { useEffect } from "react";
// Components
import AddInventoryForm from "../components/AddInventoryModal";
import InventoryModal from "../components/InventoryModal";
import InventoryTable from "../components/InventoryTable";
// Context
import { useInventoryContext } from "../context/InventoryContext";
import { useDevicesContext } from "../context/DevicesContext";
import { useAuth } from "../context/AuthContext";


function Inventory( {
    selectedItem,
    setSelectedItem,
    statusFilter,
    setStatusFilter,
    searchTerm,
    debouncedSearch,
    setSearchTerm,
    setShowAddModal,
    showAddModal
}) {
    const {inventoryItems, fetchInventory, deleteItem, loading} = useInventoryContext(); //<<<<<<<<< RIGHT HERE JUST ADDED LOADING
    const { devices } = useDevicesContext();
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            fetchInventory();
        }
    }, [token])
    return (
        <>
            {showAddModal && (
                <AddInventoryForm 
                    refreshInventory={fetchInventory} 
                    devices={devices}
                    onClose={() => setShowAddModal(false)}
                />

            )}

            <InventoryTable 
                inventoryItems={inventoryItems}  
                onSelectItem={setSelectedItem} 
                statusFilter={statusFilter} 
                onChangeFilter={setStatusFilter} 
                searchTerm={searchTerm} 
                debouncedSearch={debouncedSearch}
                onSearch={setSearchTerm}
                onDelete={deleteItem}
                setShowAddModal={setShowAddModal}
            />

            {selectedItem && (
                <InventoryModal 
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    refreshInventory={fetchInventory}
                />
            )}

        </>
    );
};

export default Inventory;