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
        res.json(Response);
        return;
    }
    const user = {
        first_name : resJson.first_name,
        last_name : resJson.last_name,
    }
    const User = await dml.add_user(user);
    Response.status = "Good"
    Response.message = User;
    res.json(Response);

})

router.post("/connect_user",async (req,res,_next) => {
    console.log("connect of user");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.first_name === undefined || resJson.last_name === undefined || resJson.pwd === undefined)
    {
        console.log("connection aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }

    const use =
        {
            first_name : resJson.first_name,
            last_name: resJson.last_name,
            pwd: resJson.pwd,
        }
    const Us = await dml.get_user(use)
    if (Us === undefined)
    {
        console.log("connection aboard")
        Response.status = "Error"
        Response.message = "Wrong user"
        res.json(Response);
        return;
    }
    const user = {
        id : Us.id,
        pwd : Us.pwd,
    }
    console.log(user)
    if (!await dml.check_mdp(user))
    {
        console.log("connection aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(Response);
        return;
    }
    const all_g = await dml.get_garden_from_user(user)
    user.gardens = all_g
    Response.status = "Good"
    Response.message = user;
    res.json(Response);

})


module.exports = router;