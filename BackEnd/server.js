const app = require("./src/app")
const connectToDb = require("./src/Database/database")
connectToDb()

app.listen("3000",()=>{
    console.log("server is running on 3000")
})