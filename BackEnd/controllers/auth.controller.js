const userModel = require("../config/user.model")

async function authController(req,res){
    const {username,email,password} = req.body
    
}

module.exports = {
    authController
}
