const express = require("express")
const { uploadSongs, getSongs } = require("../controllers/song.controller")
const upload = require("../Middleware/multerMiddleware")
const userDetails = require("../Middleware/userMiddleware")

const songRouter = express.Router()


songRouter.post("/songs",upload.single("song"),uploadSongs)
songRouter.get("/get_songs",getSongs)
module.exports = songRouter