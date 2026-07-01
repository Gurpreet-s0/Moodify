const userModel = require("../config/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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
        });

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

module.exports = {
    authRegisterController,
    authLoginController
}
