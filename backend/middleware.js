
const jwt = require('jsonwebtoken');
const userModel = require('./Models/auth.js')

const authenticatedUser = async (req,res, next)=>{
 const token = req.cookies.authtoken;
//  console.log('TOKTN==', token)
 if(!token){
    return res.status(400).json({
        message:'token not provided !'
    })
 }
 const decoded = jwt.verify(token, process.env.SECRET_KEY);
//  console.log('DECODED==', decoded);
 const user = await userModel.findById(decoded.id)
 req.user = user;
 next();

}

const authorizeRoles = (...role)=>{
    return (req,res,next)=>{
       
        if(!role.includes(req.user.role)){
            return res.status(404).json({
                message:`access denied for ${req.user.role} role`
            })
        }
        next();
    }
}


module.exports = {authenticatedUser, authorizeRoles}