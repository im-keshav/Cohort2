const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
     console.log(req.body,req.file);

    const token = req.cookies.token

    if(!token){
        return res.stauts(401).json({
            message:"Token not provided , Unauthorized access"
        })
    }

    let decoded = null
    try{

        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.stauts(401).json({
            message:"user not authorized token"
        })
    }
    
    req.user=decoded
    
    next()

}

module.exports=identifyUser