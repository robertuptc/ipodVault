import { InventoryProvider } from "./InventoryContext";
import { DevicesProvider } from "./DevicesContext";
import { AuthProvider } from "./AuthContext";

function AppProviders({ children }) {
    return (
        <AuthProvider>
            <InventoryProvider>
                <DevicesProvider>
                    {children}
                </DevicesProvider>
            </InventoryProvider>
        </AuthProvider>
    );
};

export default AppProviders