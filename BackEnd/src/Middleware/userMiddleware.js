const jwt = require("jsonwebtoken");
const blackListModel = require("../config/blacklistTokens.model");

async function userDetails(req, res, next) {
  const token = req.cookies.jwt_token;
  const isTokenBlacklisted = await blackListModel.findOne({token})

  if(isTokenBlacklisted){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized token",
    });
  }
}

module.exports = userDetails;
