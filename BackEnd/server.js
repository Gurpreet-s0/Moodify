const app = require("./src/app")
const connectToDb = require("./Database/database")
connectToDb()

app.listen("3000",()=>{
    console.log("server is running on 3000")
})