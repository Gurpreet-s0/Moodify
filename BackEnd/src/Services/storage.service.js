const imageKit = require("@imagekit/nodejs").default

const client = new imageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY
})

async function uploadFile({buffer,fileName,folderName = ""}){
    const res = await client.files.upload({
        Buffer: await imageKit.toFile(Buffer.from(buffer)),
        fileName:fileName,
        folder:folderName
    })
    return res
}

module.exports = {uploadFile}