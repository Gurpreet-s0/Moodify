const songModel = require("../config/songs.model");
const nodeID3 = require("node-id3");
const { uploadFile } = require("../Services/storage.service");
async function uploadSongs(req, res) {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;
  const tags = nodeID3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    uploadFile({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folderName: "/moodify/songs",
    }),
    uploadFile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folderName: "/moodify/poster",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    songUrl: songFile.url,
    posterUrl: posterFile.url,
    mood: mood,
  });

  res.status(201).json({
    message: "Song url create successfully",
    song,
  });
}

async function getSongs(req,res){
  const {mood} = req.query

  const song = await songModel.findOne({
    mood
})

  res.status(200).json({
    message:"Song fetched successfully",
    song
  })
}

module.exports = {
  uploadSongs,
  getSongs
};
