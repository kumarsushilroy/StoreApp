
const mongoose = require('mongoose');


const connect = ()=>{
    // mongodb+srv://romanreins488:storeApp1234@storeapp.fiwic1r.mongodb.net/appStore
   

    // mongodb://127.0.0.1:27017/store-app
    mongoose.connect('mongodb+srv://romanreins488:chintu@storeapp.fiwic1r.mongodb.net/?appName=storeApp').then(()=>{
        console.log('Connection Successfull')
    }).catch((err)=>{
        console.log(err.message) 
    })
};


module.exports = connect ; 