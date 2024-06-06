const fs = require('node:fs');
const path = require("path");
const Uuid = require("uuid")
const email = require('./Email.js')

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "Data");

const USER = "User.json";
const GARDEN = "Garden.json";
const LOG = "Garden_Log.json";
const FLOWER = "Flower.json"
const MAX_LOG = 10
const DRY = 8000
const WATER = 11000
const MAX_TEMP = 34
const MIN_TEMP = 10


async function write_file(filename, data) {
    if (data === undefined) {
        fs.writeFileSync(path.join(dataPath, filename), "[]");
    } else {
        fs.writeFileSync(path.join(dataPath, filename), data);
    }
}

async function readDataRout(entityName) {
    const path_company = path.join(dataPath, entityName)
    const rawFileContent = await fs.promises.readFile(path_company)
    return JSON.parse(rawFileContent.toString());
}


async function send_email_to_resp(addr,subject,text)
{
    await email.send_mail(addr,subject,text)
}


async function add_garden(data) {
    const filename_Garden = GARDEN;
    const filename_Log = LOG;
    // add data to the company
    const olderData_Garden = await readDataRout(filename_Garden);
    const olderData_Log = await readDataRout(filename_Log);
    data.id = Uuid.v4();
    data.token = Uuid.v4();
    const log =
        {
            id:data.id,
            log : [],
        }
    const allData_Garden = [data, ...olderData_Garden];
    const allData_Log = [log, ...olderData_Log];
    await write_file(filename_Garden, JSON.stringify(allData_Garden))
    await write_file(filename_Log,JSON.stringify(allData_Log));



    return data;
}

async function add_user(data) {
    const filename = USER;
    // add data to the company
    const olderData = await readDataRout(filename);
    data.id = Uuid.v4();
    data.pwd = Uuid.v4();
    const allData = [data, ...olderData];
    await write_file(filename, JSON.stringify(allData))
    return data;
}

async function add_data(data,garden,token)
{
    if (token === undefined || garden.id === undefined || garden.plant_id === undefined)
    {
        return false;
    }
    const garden_id = garden.id;
    const Data = await readDataRout(GARDEN)
    const Garden_index = await Data.findIndex((garden) => (garden.id === garden_id));
    if (Garden_index === -1)
    {
        return false;
    }
    const Garden = Data[Garden_index];
    if (Garden.token !== token)
    {
        return false;
    }

    const plt = await Garden.flower_id.find((plants) => (plants === garden.plant_id))
    if (plt === undefined)
    {
        return false;
    }
    const DataLog = await readDataRout(LOG);
    const Log_Garden_Index = await Data.findIndex((Log) => (Log.id === garden_id))
    const Log = DataLog[Log_Garden_Index];
    const Log_flower_index = await Log.log.findIndex((id) => (id.id === garden.plant_id));
    const Flower = Log.log[Log_flower_index]
    if (data.temperature !== undefined)
    {
        Flower.temperature.push(data.temperature)
        if (Flower.temperature.length>MAX_LOG)
        {
            Flower.temperature.shift()
        }
    }
    if (data.soil !== undefined)
    {
        Flower.soil.push(data.soil)
        if (Flower.soil.length>MAX_LOG)
        {
            Flower.soil.shift()
        }
    }

    let is_good = true

    let sum_t = 0;
    let sum_s = 0;
    Flower.temperature.forEach( num => {
        sum_t += num;
    })
    Flower.soil.forEach(num =>
    {
        sum_s += num;
    })

    const temp_m = sum_t/Flower.temperature.length;
    const soil_m = sum_s/Flower.soil.length;

    const All_flower = await readDataRout(FLOWER);
    const this_f = All_flower.find((f) => f.id === garden.plant_id)

    if (soil_m < DRY || soil_m > WATER || temp_m<MIN_TEMP || temp_m>MAX_TEMP)
    {
        is_good = false
    }


    let send_email = false
    if (is_good !== Flower.last_check)
    {
        console.log(Log.last_check)
        console.log(typeof(Log.last_check))
        send_email = true
    }
    Flower.last_check = is_good
    await write_file(LOG,JSON.stringify(DataLog));



    if (send_email)
    {
        const All_user = await readDataRout(USER)
        const members = Garden.member
        let subject = "Smart Gardener information about the watering"
        let text = "The soil need to be check in a short amount of time"
        if (is_good)
        {
            text = "The soil is back to normal"
        }
        for(let i = 0;i<members.length;i++)
        {
            console.log(members[i])
            const us = await All_user.find((usr) => (usr.id === members[i]))
            await send_email_to_resp(us.last_name,subject,text)
        }
    }

    return true;

}


async function add_plant(garden,plant){
    if (garden.id === undefined || plant.id === undefined)
    {
        return false;
    }
    const garden_id = garden.id;
    const Data = await readDataRout(GARDEN)
    const Data_Plant = await readDataRout(FLOWER);
    const Garden_index = await Data.findIndex((garden) => (garden.id === garden_id));
    const Plant_index = await Data_Plant.findIndex((plants) => (plants.id === plant.id));
    if (Garden_index === -1 || Plant_index === -1)
    {
        return false;
    }
    const Garden = Data[Garden_index];
    const plt = await Garden.flower_id.find((plants) => (plants === plant.id))
    if (plt !== undefined)
    {
        return false;
    }

    Data[Garden_index].flower_id.push(plant.id);
    await write_file(GARDEN,JSON.stringify(Data))
    const DataLog = await readDataRout(LOG);
    const Log = DataLog[await DataLog.findIndex((log) => (log.id === Garden.id))]
    const Flower = {
        id : plant.id,
        temperature: [],
        soil: []
    }
    Log.log.push(Flower);
    await write_file(LOG,JSON.stringify(DataLog));
    return true;
}


async function add_user_to_garden(owner,user_id,garden_id)
{
    if ((!(await check_mdp(owner))) || (!(await user_exist(user_id,garden_id))) || (!(await user_in_garden(owner.id,garden_id))))
    {
        return false
    }
    const Data = await readDataRout(GARDEN)
    const Garden = await Data.findIndex((garden) => (garden.id === garden_id));
    if (Garden === -1)
    {
        return false;
    }
    const User_in_Garden = await Data[Garden].member.find((user) => (user === user_id))
    if (User_in_Garden !== undefined)
    {
        return false;
    }
    Data[Garden].member.push(user_id);
    await write_file(GARDEN,JSON.stringify(Data));
    return true;
}


async function check_mdp(user) {
    console.log("Check user pwd of user : " + user)
    return (user.id !== undefined && user.pwd !== undefined) && ((await(await readDataRout(USER)).find((user_f) => (user_f.id === user.id && user_f.pwd === user.pwd))) !== undefined)

}

async function user_in_garden(user_id,garden_id)
{
    return (garden_id !== undefined && user_id !== undefined) &&
        ((await(await readDataRout(USER)).find((user) => (user.id === user_id))) !== undefined) &&
        ((await(await readDataRout(GARDEN)).find((garden) => (garden.id === garden_id))) !== undefined) &&
        ((await((await(await readDataRout(GARDEN)).find((garden) => (garden.id === garden_id))).member).find((user) => (user === user_id))) !== undefined)
}

async function is_owner_garden(user_id,garden_id)
{
    return (garden_id !== undefined && user_id !== undefined) &&
        ((await(await readDataRout(USER)).find((user) => (user.id === user_id))) !== undefined) &&
        ((await(await readDataRout(GARDEN)).find((garden) => (garden.id === garden_id))) !== undefined) &&
        (await readDataRout(GARDEN)).find((garden) => (garden.id === garden_id)).ownerId === user_id
}

async function user_exist(user_id,garden_id)
{
    return (user_id !== undefined) &&
           ((await(await readDataRout(USER)).find((user) => (user.id === user_id))) !== undefined)
}

async function get_all_data(user,garden_id) {
    if ((!(await check_mdp(user))) || (!(await user_exist(user.id))) || (!(await user_in_garden(user.id,garden_id)))) {
        return false
    }
    const Data_G = await readDataRout(GARDEN)
    const Data_L = await readDataRout(LOG);
    const Data_F = await readDataRout(FLOWER);
    const Data_U = await readDataRout(USER);
    const Garden = await Data_G.findIndex((garden) => (garden.id === garden_id));
    if (Garden === -1) {
        return false;
    }
    const this_garden = Data_G[Garden]
    const flowers = [...this_garden.flower_id]
    const members = [...this_garden.member]
    this_garden.flower_id = []
    this_garden.member = []
    this_garden.log = Data_L.find((log) => (log.id === this_garden.id))
    for (let i = 0 ; i<flowers.length;i++)
    {
        const flower = Data_F.find((flow) => (flow.id === flowers[i]))
        this_garden.flower_id.push(flower)
    }
    for (let i = 0 ; i<members.length;i++)
    {
        const member = Data_U.find((flow) => (flow.id === members[i]))
        this_garden.member.push(member)
    }

    console.log(this_garden)
    return this_garden;


}


async function get_garden_from_user(user)
{
    const gardens_id = []
    const Data_G = await readDataRout(GARDEN)
    for (let i = 0;i<Data_G.length;i++) {
        const garden_id = Data_G[i].id
        if (await user_in_garden(user.id, garden_id)) {
            gardens_id.push(garden_id)
        }
    }
    return gardens_id
}

async function get_user(user)
{
    const Data_U = await readDataRout(USER);
    const User  = await Data_U.find((us) => (us.first_name === user.first_name && us.last_name === user.last_name && us.pwd === user.pwd))
    return User
}


async function delete_garden(user,garden_id)
{
    if (await is_owner_garden(user.id,garden_id))
    {
        const Data_G = await readDataRout(GARDEN)
        const Data_L = await readDataRout(LOG)
        const ind = await Data_G.findIndex((gard) => gard.id === garden_id)
        const ind_l = await Data_L.findIndex((log) => log.id === garden_id)
        Data_G.splice(ind,1)
        Data_L.splice(ind_l,1)
        await write_file(GARDEN,JSON.stringify(Data_G));
        await write_file(LOG,JSON.stringify(Data_L))
        return true
    }
    return false
}

async function delete_flower(user,garden_id,plant_id)
{
    if (await user_in_garden(user.id,garden_id))
    {
        const Data_G = await readDataRout(GARDEN)
        const ind = await Data_G.findIndex((gard) => gard.id === garden_id)
        const ind_f = Data_G[ind].flower_id.findIndex((f) => (f === plant_id))
        if (ind_f === -1)
        {
            return false
        }
        Data_G[ind].flower_id.splice(ind_f,1)
        await write_file(GARDEN,JSON.stringify(Data_G));
        return true
    }
    return false
}



module.exports.add_garden = add_garden;
module.exports.check_mdp = check_mdp;
module.exports.add_user = add_user
module.exports.add_user_to_garden = add_user_to_garden
module.exports.add_data = add_data
module.exports.add_plant = add_plant
module.exports.get_all_data = get_all_data
module.exports.get_garden_from_user = get_garden_from_user
module.exports.get_user = get_user;
module.exports.delet_garden = delete_garden
module.exports.delete_flower = delete_flower
module.exports.send_email_to_resp = send_email_to_resp