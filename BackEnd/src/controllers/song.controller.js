const songModel = require("../config/songs.model")
const nodeID3 = require("node-id3")
const {uploadFile} = require("../Services/storage.service")
async function uploadSongs(req,res){
    const songBuffer = req.file.buffer
    const {mood} = req.body
    const tags = nodeID3.read(songBuffer)

    
    const songFile = await uploadFile({
        buffer:songBuffer,
        fileName:tags.title + ".mp3",
        folderName:"/moodify/songs"
    })

    const posterFile = await uploadFile({
        buffer:tags.image.imageBuffer,
        fileName:tags.title + ".jpeg",
        folderName:"/moodify/poster"
    })

    const song = await songModel.create({
        title:tags.title,
        songUrl:songFile.url,
        posterUrl:posterFile.url,
        mood:mood
    })

    res.status(201).json({
        message:"Song url create successfully",
        song
    })

}

module.exports = {
    uploadSongs
}