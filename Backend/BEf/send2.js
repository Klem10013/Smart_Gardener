const { IoTHubDeviceClient } = require('@azure/iothub');

async function sendMessageToIoTHub() {
    // Connection string for your Azure IoT Hub device
    const connectionString = "HostName=IOTProject67.azure-devices.net;DeviceId=SmartGardenerID;SharedAccessKey=RpjgS+hh1C5PoRjV9DKqdyQ2i06uc1DfIAIoTJEr0uo=";

    // Create a new IoTHubDeviceClient
    const deviceClient = IoTHubDeviceClient.fromConnectionString(connectionString);

    // Connect to the Azure IoT Hub
    await deviceClient.connect();

    // Define the message payload
    const message = JSON.stringify({
        temperature: 25.5,
        humidity: 60
    });

    // Send the message to Azure IoT Hub
    await deviceClient.sendEvent(message);

    console.log('Message sent to Azure IoT Hub');

    // Disconnect from Azure IoT Hub
    await deviceClient.disconnect();

    console.log('Disconnected from Azure IoT Hub');
}

// Run the function to send a message
sendMessageToIoTHub().catch((err) => {
    console.error('Error sending message to Azure IoT Hub:', err.message);
});