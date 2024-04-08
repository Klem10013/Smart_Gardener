const express = require("express")
const app = express()

app.get("/Server_up",(req,res,_next ) => {
    const status =
        {
            status:"active"
        }
    res.json(JSON.stringify(status));
});

app.use(express.json());
app.use("/garden",require("./path/garden"));
app.use("/user",require("./path/user"));


app.listen(3001);