const express = require("express");
const router = express.Router();
const dml = require("../Data/Manage_data")


router.post("/create_garden", async (req, res, _next) => {
    console.log("Creation of a new garden");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.name === undefined || resJson.address === undefined || resJson.ownerId === undefined || resJson.pwd === undefined) {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user = {
        id : resJson.ownerId,
        pwd : resJson.pwd,
    }
    if (!await dml.check_mdp(user))
    {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(Response);
        return;
    }

    const gard =
        {
            name : resJson.name,
            address : resJson.address,
            ownerId : resJson.ownerId,
            flower_id : [],
            member : [resJson.ownerId]

        }
    const garden = await dml.add_garden(gard);
    Response.status = "Good"
    Response.message = garden;
    res.json(Response);


});


router.post("/add_user_garden",async (req,res,_next) => {
    console.log("add_user_garden");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id_add === undefined || resJson.id === undefined || resJson.pwd === undefined || resJson.id_garden === undefined) {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user =
        {
            id : resJson.id,
            pwd : resJson.pwd,
        }
    if (!(await dml.check_mdp(user)))
    {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "pwd wrong"
        res.json(Response);
        return;
    }
    if (await dml.add_user_to_garden(user,resJson.id_add,resJson.id_garden)) {
        Response.status = "Good"
        Response.message = "USer add";
        res.json(Response);
    }
    else
    {
        Response.status = "Bad"
        Response.message = "USer not add";
        res.json(Response);
    }

})

router.post("/add_data_garden",async (req,res,_next) =>
{
    console.log("add_data_garden");
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id_garden === undefined || resJson.token === undefined) {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const garden = {
        id : req.body.id_garden,
        plant_id: req.body.plant_id
    }
    const data = {
        temperature: req.body.temperature,
        soil : req.body.soil,
    }
    if (await dml.add_data(data,garden,req.body.token))
    {
        Response.status = "Good"
        Response.message = "Data has been added";
        res.json(Response);
    }
    else
    {
        Response.status = "Bad"
        Response.message = "Data can not be added";
        res.json(Response);
    }


})


router.post("/get_data_garden",async (req,res,_next) =>
{
    console.log("get_data_garden");
    //await dml.send_email_to_resp()
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id === undefined || resJson.pwd === undefined || resJson.id_garden === undefined) {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user = {
        id : resJson.id,
        pwd : resJson.pwd
    }
    const rep = await dml.get_all_data(user,req.body.id_garden)
    console.log(rep)
    if (!rep)
    {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Error to get data"
        res.json(Response);
        return;
    }
    Response.status = "Good"
    Response.message = rep
    res.json(Response)
    return ;
})


router.delete("/delete_garden",async (req,res,_next) =>
{
    console.log("Delet_garden")
    const resJson = req.body;
    const Response = {
        message: "",
        status: ""
    }
    if (resJson.id === undefined || resJson.pwd === undefined || resJson.id_garden === undefined) {
        console.log("delet garden aboard")
        Response.status = "Error"
        Response.message = "Information missing"
        res.json(Response);
        return;
    }
    const user = {
        id : resJson.id,
        pwd : resJson.pwd
    }
    const de = await dml.delet_garden(user,resJson.id_garden);
    if (!de)
    {
        console.log("creation aboard")
        Response.status = "Error"
        Response.message = "Error delet garden"
        res.json(Response);
        return;
    }
    Response.status = "Good"
    Response.message = "Garden deleted"
    res.json(Response);
})


module.exports = router