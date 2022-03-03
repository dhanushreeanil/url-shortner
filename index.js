const express = require("express")
const configureDb = require("./config/database")
const router = require("./config/routes")
const useragent = require("express-useragent")

const port = 3001

const app = express()
app.use(express.json())

app.use(useragent.express())

app.use("/",router)
configureDb()



app.listen(port,()=>{
    console.log("server is running on port", port);
})