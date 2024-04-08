const fs = require('node:fs');
const path = require("path");
const Uuid = require("uuid")

const rootPath = path.dirname(process.mainModule.filename);
const dataPath = path.join(rootPath, "Data");

const USER = "User.json";
const GARDEN = "Garden.json";

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

async function add_garden(data) {
    const filename = GARDEN;
    // add data to the company
    const olderData = await readDataRout(filename);
    data.id = Uuid.v4();
    const allData = [data, ...olderData];
    await write_file(filename, JSON.stringify(allData))
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

async function add_user_to_garden(owner,user_id,garden_id)
{
    if ((!(await check_mdp(owner))) || (!(await user_exist(user_id))))
    {
        return false
    }
    const Data = await readDataRout(GARDEN)
    const Garden = await Data.findIndex((garden) => (garden.id === garden_id));
    console.log(Data[0].id);
    console.log(garden_id);
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

async function user_exist(user_id)
{
    return (user_id !== undefined) && ((await(await readDataRout(USER)).find((user) => (user.id === user_id))) !== undefined)
}


module.exports.add_garden = add_garden;
module.exports.check_mdp = check_mdp;
module.exports.add_user = add_user
module.exports.add_user_to_garden = add_user_to_garden