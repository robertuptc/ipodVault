import IpodModels from "../components/IpodModels";

function Models({ devices, setSelectedModel, selectedModel, inventoryItems, ownedDeviceIds }) {
    return (
        <>
            <h2 className="mb-4">iPod Models</h2>

            <IpodModels
                devices={devices}
                onSelectModel={setSelectedModel}
                selectedModel={selectedModel}
                ownedDeviceIds={ownedDeviceIds}
            />
        </>
    );
};

export default Models;