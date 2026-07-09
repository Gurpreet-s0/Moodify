const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    songUrl:{
        type:String,
        required:[true,"Song url is required"]
    },
    posterUrl:{
        type:String,
        required:[true,"Poster url is required"]
    },
    title:{
        type:String,
        required:[true,"Title url is required"]
    },
    mood:{
        type:String,
        enum:{
            values:["sad","happy","surprised"],
            message:"Enums this is"
        }
    }
})

const songModel = mongoose.model("songs",songSchema)

module.exports = songModel