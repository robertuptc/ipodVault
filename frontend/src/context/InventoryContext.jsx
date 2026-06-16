
import { createContext, useContext } from "react";
// Hooks
import useInventory from "../hooks/useInventory";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
    const inventory = useInventory();

    return (
        <InventoryContext.Provider value={inventory}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventoryContext() {
    return useContext(InventoryContext);
}