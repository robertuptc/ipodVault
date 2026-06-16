// React Router
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// Components
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/ProtectedRoute';
// Pages
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Inventory from '../pages/Inventory';
import Models from '../pages/Models';
import Profile from '../pages/Profile';
// Context
import { useInventoryContext } from "./InventoryContext";
import { useDevicesContext } from "./DevicesContext";

function AppContent() {

    const { inventoryItems } = useInventoryContext();
    const { devices } = useDevicesContext();
    
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const location = useLocation()

    const totalItems = inventoryItems.length;

    const totalForSale = inventoryItems.filter(
        item => item.status === "FOR_SALE"
    ).length;

    const totalSold = inventoryItems.filter(
        item => item.status === "SOLD"
    ).length;

    const totalProfit = inventoryItems
    .filter(item => item.status === "SOLD")
    .reduce((acc, item) => acc + Number(item.profit || 0), 0);

    const formattedProfit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(totalProfit)

    const ownedDeviceIds = new Set(
        inventoryItems
            .filter(item => item.status === "PERSONAL")
            .map(item => item.device)
    )

    // DEBOUNCED SEARCH LOGIC
    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <>
            {/* Navbar */}
            {location.pathname !== "/login" && <Navbar />}

            <div className="d-flex">
                <div className="flex-grow-1">
                <div className="container py-4">
                    
                    <Routes>
                    
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/inventory"
                        element={
                            <ProtectedRoute>
                                <Inventory 
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                searchTerm={searchTerm}
                                debouncedSearch={debouncedSearch}
                                setSearchTerm={setSearchTerm}
                                setShowAddModal={setShowAddModal}
                                showAddModal={showAddModal}
                                />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route 
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard
                                totalItems={totalItems} 
                                totalForSale={totalForSale} 
                                totalSold={totalSold} 
                                totalProfit={totalProfit}
                                formattedProfit={formattedProfit}
                                inventoryItems={inventoryItems}
                                devices={devices}
                                ownedDeviceIds={ownedDeviceIds}
                                />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/models"
                        element={
                            <ProtectedRoute>
                                <Models 
                                    devices={devices}
                                    setSelectedModel={setSelectedModel}
                                    selectedModel={selectedModel}
                                    ownedDeviceIds={ownedDeviceIds}
                                />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    </Routes>
                </div>
                </div>
            </div>
        </>
    )
}

export default AppContent;