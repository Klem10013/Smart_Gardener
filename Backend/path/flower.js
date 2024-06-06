const express = require("express");
const router = express.Router();
const dml = require("../Data/Manage_data")


router.post("/add_flower",async (req, res, _next) =>
{
    console.log("Add new flower to garden");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id === undefined || resJson.pwd === undefined || resJson.id_garden === undefined || resJson.plant_id === undefined) {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(JSON.stringify(Response));
        return;
    }
    const user = {
        id : resJson.id,
        pwd : resJson.pwd,
    }
    if (!await dml.check_mdp(user))
    {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(JSON.stringify(Response));
        return;
    }
    const garden =
        {
            id : resJson.id_garden,
        }
    const plant =
        {
            id : resJson.plant_id,
        }
    if (await dml.add_plant(garden,plant))
    {
        console.log("Add plant is good")
        Response.status = "Good"
        Response.message = "Plant was added"
        res.json(JSON.stringify(Response));
    }
    else
    {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "smth went wrong"
        res.json(JSON.stringify(Response));
    }
})



module.exports = router