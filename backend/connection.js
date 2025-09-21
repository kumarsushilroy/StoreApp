
const mongoose = require('mongoose');


const connect = ()=>{
    // mongodb+srv://romanreins488:storeApp1234@storeapp.fiwic1r.mongodb.net/appStore
    mongoose.connect('mongodb://127.0.0.1:27017/store-app ').then(()=>{
        console.log('Connection Successfull')
    }).catch((err)=>{
        console.log(err.message)
    })
};


module.exports = connect ;