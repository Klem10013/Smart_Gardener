//@@viewOn:imports
//const Config = require("uu_appg01_server").Utils.Config;
const iothub = require("azure-iothub");
const Message = require("azure-iot-common").Message;
const crypto = require("crypto");
//@@viewOff:imports

const Owner = "HostName=IOTProject67.azure-devices.net;DeviceId=SmartGardenerID;SharedAccessKey=RpjgS+hh1C5PoRjV9DKqdyQ2i06uc1DfIAIoTJEr0uo=";
const Service = Owner;

//@@viewOn:components
class IoTHubClient {
    constructor() {}

    createDevice(deviceId) {
        const iotHubRegistry = iothub.Registry.fromConnectionString(Owner);

        return new Promise((resolve, reject) => {
            const device = { deviceId };
            iotHubRegistry.create(device, (err, deviceInfo, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(deviceInfo);
                }
            });
        });
    }

    deleteDevice(deviceId) {
        const iotHubRegistry = iothub.Registry.fromConnectionString(Owner);

        return new Promise((resolve, reject) => {
            iotHubRegistry.delete(deviceId, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    sendMessage(deviceId, msg) {
        const iotHubService = iothub.Client.fromConnectionString(Service, iothub.AmqpWs);

        const message = new Message(JSON.stringify(msg));
        message.messageId = crypto.randomBytes(16).toString("hex");
        message.creationTimeUtc = new Date().toISOString();

        return new Promise((resolve, reject) => {
            iotHubService.send(deviceId, message, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    changeDeviceStatus(deviceId, status) {
        const iotHubRegistry = iothub.Registry.fromConnectionString(Owner);

        return new Promise((resolve, reject) => {
            iotHubRegistry.get(deviceId, (err, deviceInfo) => {
                if (err) {
                    reject(err);
                } else {
                    deviceInfo.status = status;
                    iotHubRegistry.update(deviceInfo, (err, updatedDevice) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(updatedDevice);
                        }
                    });
                }
            });
        });
    }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new IoTHubClient();
//@@viewOff:exports
