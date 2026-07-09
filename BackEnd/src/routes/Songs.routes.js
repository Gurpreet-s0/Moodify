const express = require("express")
const { uploadSongs } = require("../controllers/song.controller")
const upload = require("../Middleware/multerMiddleware")

const songRouter = express.Router()


songRouter.post("/songs",upload.single("song"),uploadSongs)

module.exports = songRouter