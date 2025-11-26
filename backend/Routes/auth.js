
const express = require('express');
const router = express.Router();
// const upload = require('../helper/upload.js')

const {register, login, logOut, myProfile, forgotPassword, resetPassword, getSingleUser, updateUser, updatePassword, allUsers, upload} = require('../Controllers/auth.js');
const {authenticatedUser, authorizeRoles} = require('../middleware.js');


router.post('/register', upload.single("photo"), register);
router.post('/login', login);
router.post('/logout', logOut);
router.get('/singleUser/:id', getSingleUser);
router.get('/all-users', allUsers);
router.put('/updateUser/:id', updateUser);
router.post('/update-Password', authenticatedUser, updatePassword);

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