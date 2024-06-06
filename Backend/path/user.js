const express = require("express");
const router = express.Router();
const dml = require("../Data/Manage_data")


router.post("/create_user",async (req,res,_next) => {
    console.log("creation of user");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.first_name === undefined || resJson.last_name === undefined)
    {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(JSON.stringify(Response));
        return;
    }
    const user = {
        first_name : resJson.first_name,
        last_name : resJson.last_name,
    }
    const User = await dml.add_user(user);
    Response.status = "Good"
    Response.message = User;
    res.json(JSON.stringify(Response));

})

module.exports = router;