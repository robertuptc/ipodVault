import { useState, useEffect } from "react";
// Services
import { getAllModels } from "../services/inventoryService";

function useDevices() {

    const [devices, setDevices] = useState({});

    useEffect(() => {
        // API call to get all ipod models
        getAllModels()
            .then(res => {
                setDevices(res.data)            
            })
            .catch(err => console.error(err));
    }, [])

    return { devices }
};

export default useDevices;