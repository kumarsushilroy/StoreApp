
const express = require('express');
const router = express.Router();
const {register, login, logOut, myProfile, forgotPassword, resetPassword} = require('../Controllers/auth.js');


const {authenticatedUser, authorizeRoles} = require('../middleware.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);

router.get('/my-profile', authenticatedUser, myProfile );

// Forgot Password Route
router.post('/password/forgot', forgotPassword ); 

// reset Password
router.put('/password/reset/:token', resetPassword) 



router.get('/test', authenticatedUser, authorizeRoles('admin'), async (req,res)=>{
    console.log('api tested')
   return res.json({message:'tested apiiiiiiii'})
})

module.exports = router;