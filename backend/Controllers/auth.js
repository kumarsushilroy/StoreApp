const userModel = require("../Models/auth.js");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const cloudinary = require('../helper/cloudinaryconfig.js');
const crypto = require("crypto");
const sendEmail = require("../Utils/sendEmail.js");
const getResetPasswordTemplate = require("../Utils/emailTemplate.js");
const multer = require('multer')


 // photo config.......................
 const imgConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null, 'upload/')
    },
    filename:(req,file,callback)=>{
      callback(null, `image-${Date.now()}-${file.originalname}`)
    }
  })
  const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
      callback(null, true)
    }else{
      callback(new Error('only image is allowed to upload !'))
    }
  }

  const upload = multer({
    storage:imgConfig,
    fileFilter:isImage
  });

 

  


  
  //photo config...........................

const register = async (req, res) => {

  try {
    //  console.log('reqFile== ', req.file)
    const upload = await cloudinary.uploader.upload(req.file.path);
    

    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: "please fill all required fields",
        success: false,
      });
    }

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        message: "user already exists !",
        success: false,
      });
    }

    const currentUser = new userModel(req.body);
    const token = jwt.sign({ id: currentUser._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.cookie("authtoken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 100,
      secure: false,
    });

    const hashPassword = await bcrypt.hash(password, 10);

    const newRegister = new userModel({
      username,
      email,
      password: hashPassword,
      role,
      photo: upload.secure_url
    });

    const registeredUser = await newRegister.save();
    return res.status(200).json({
      message: "Registered Successfully !",
      success: true,
      registeredUser,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).json({
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password is required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user does not exist !",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "password do not match !",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("authtoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite:'none'
    });

    return res.status(200).json({
      message: "login successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).json({
      message: "something went wrong !",
    });
  }
};

// LogOut
const logOut = async (req, res) => {
  try {
    res.clearCookie("authtoken", { httpOnly: true });
    return res.status(200).json({
      success: true,
      msg: " log out successfully",
    });
  } catch (error) {
    console.log("errr", error);
    return res.status(404).json({
      message: "something is wrong !",
      err: error,
    });
  }
};

// single User....
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await userModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "got single user",
      user: singleUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong ",
      error: error.message,
    });
  }
};

// updateSingle user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const myProfile = async (req, res) => {
  const user = req.user._id;
  const myself = await userModel.aggregate([
    { $match: { _id: user } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "userId",
        as: "product",
      },
    },
  ]);

  // console.log('myselfff==', JSON.stringify(myself));
  return res.status(200).json({
    success: true,
    msg: "got success",
    myself,
  });
};

// get current user profile
const updatePassword = async(req,res)=>{
  try{
    const userId = req.user._id;
    const user = await userModel.findById(userId).select("password")
    console.log('Userrr==', user)
    const comparePassword = await bcrypt.compare(req.body.oldPassword,user.password)
    if(!comparePassword){
      return res.status(404).json({
        message:'old password do not match with your password'
      })
    }
    user.password = await bcrypt.hash(req.body.password,10)
   await user.save();

    return res.json({
      user
    })
    
  }catch(error){
    return res.status(404).json({
      success:false,
      message:'something went wrong!',
      error:error.message
    })
  }
}

// Forgot Password...............
const forgotPassword = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log("userrrr", user);
  if (!user) {
    return res.status(400).json({
      message: "user does not exist !",
    });
  }

  // get reset password token.....

  const resetToken = user.getResetPasswordToken();
  await user.save();

  // create reset password url.....
  const resetUrl = `${process.env.FRONTENT_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.username, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "appStore Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return res.status(400).json({
      message: "something went wrong !",
      success: false,
      error: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  //   console.log("paramsToken", req.params.token);
  console.log("RESET PASSWORD...............");

  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    // console.log("USERRR", user);
    if (!user) {
      return res.status(400).json({
        message: "password reset token is invalid or has been expired !",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        message: "your password is not matching with confirmPassword",
      });
    }

    // set the new password

    //  user.password = req.body.password
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPass;

    // console.log('NEw passw Userrrrr', user)

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    //    sendToken(user, 200, res)
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
    console.log("ERROR", error.message);
  }
};

module.exports = {
  register,
  login,
  logOut,
  myProfile,
  forgotPassword,
  resetPassword,
  getSingleUser,
  updateUser,
  updatePassword,
  upload
};
