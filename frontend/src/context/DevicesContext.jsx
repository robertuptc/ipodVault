import { createContext, useContext } from "react";
// Hooks
import useDevices from "../hooks/useDevices";

const DevicesContext = createContext();

export function DevicesProvider({ children }) {
    const devicesData = useDevices();

    return (
        <DevicesContext.Provider value={devicesData}>
            {children}
        </DevicesContext.Provider>
    );
}

export function useDevicesContext() {
    return useContext(DevicesContext);
}