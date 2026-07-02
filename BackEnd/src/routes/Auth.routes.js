const express = require("express")
const authRouter = express.Router()
const {authRegisterController, authLoginController ,getMeController, logOut} = require("../controllers/auth.controller")
const userDetails = require("../Middleware/userMiddleware")

authRouter.post("/register", authRegisterController)
authRouter.post("/login",authLoginController)
authRouter.get("/get-me",userDetails,getMeController)
authRouter.get("/logout",userDetails,logOut)

module.exports = authRouter