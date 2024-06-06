const express = require("express");
const router = express.Router();
const dml = require("../Data/Manage_data")


router.post("/add_flower", async (req, res, _next) => {
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
        res.json(Response);
        return;
    }
    const user = {
        id: resJson.id,
        pwd: resJson.pwd,
    }
    if (!await dml.check_mdp(user)) {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(Response);
        return;
    }
    const garden =
        {
            id: resJson.id_garden,
        }
    const plant =
        {
            id: resJson.plant_id,
        }
    if (await dml.add_plant(garden, plant)) {
        console.log("Add plant is good")
        Response.status = "Good"
        Response.message = "Plant was added"
        res.json(Response);
    } else {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "smth went wrong"
        res.json(Response);
    }
})


router.delete("/delete_flower", async (req, res, _next) => {
    console.log("Delet_garden")
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id === undefined || resJson.pwd === undefined || resJson.id_garden === undefined || resJson.plant_id === undefined) {
        console.log("delete flower aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user = {
        id: resJson.id,
        pwd: resJson.pwd
    }
    const de = await dml.delete_flower(user, resJson.id_garden, resJson.plant_id);
    if (!de) {
        console.log("delete aboard")
        Response.status = "Error"
        Response.message = "Error delete flower"
        res.json(Response);
        return;
    }
    Response.status = "Good"
    Response.message = "flower deleted"
    res.json(Response);
})

router.post("/add_flower_db", async (req, res, _next) => {
    console.log("Add new flower to the database");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }

    if (resJson.id === undefined || resJson.pwd === undefined || resJson.plant_name === undefined) {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user = {
        id: resJson.id,
        pwd: resJson.pwd,
    }
    if (!await dml.check_mdp(user)) {
        console.log("Add plant is aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(Response);
        return;
    }
    await dml.add_flower_db(resJson.plant_name)
    Response.status = "Good"
    Response.message = "The Plant has been add"

    res.json(Response)
})



router.get("/add_flower_db", async (req, res, _next) => {
    console.log("Add new flower to the database");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    Response.status = "Good";
    Response.message = await dml.get_flower()
    res.json(Response)
})

    module.exports = router