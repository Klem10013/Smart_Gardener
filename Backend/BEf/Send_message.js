const IoTHubClient = require("./send");



try {
    return IoTHubClient.sendMessage("SmartGardenerID", "test connard");
} catch (e) {
    throw e;
}