const userModel = require("../config/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const blackListModel = require("../config/blacklistTokens.model")

async function authRegisterController(req,res){
    const {username,email,password} = req.body
    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserExist){
        return res.status(400).json({
            message:"User already exist"
        })
    }
    const hashedPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username:username,
        email:email,
        password:hashedPass
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_TOKEN,{expiresIn:"3d"})

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"user creates successfully",
        user:{
            username,
            email,token
        }
    })

}

async function authLoginController(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        }).select("+password")

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_TOKEN,
            {
                expiresIn: "3d"
            }
        );

        res.cookie("jwt_token", token);

        return res.status(200).json({
            message: "Logged in successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

async function getMeController(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    res.status(200).json({
        message:"user fetched successfully",
        user
    })
}

async function logOut(req,res){
    const token = req.cookies.jwt_token

    res.clearCookie('jwt_token')

    await blackListModel.create({
        token:token
    })

    res.status(200).json({
        message:"Logout successfully"
    })
}
 
module.exports = {
    authRegisterController,
    authLoginController,
    getMeController,
    logOut
}
