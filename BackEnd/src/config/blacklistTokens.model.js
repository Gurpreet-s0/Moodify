const mongoose = require("mongoose")

const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        
    }
},{
    timestamps:true
})

const blackListModel = mongoose.model("BlackList-Tokens",blackListSchema)


module.exports = blackListModel