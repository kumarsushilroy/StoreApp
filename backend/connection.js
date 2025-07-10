const mongoose = require('mongoose');

const connect = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/store-app').then(()=>{
        console.log('Connection Successfull')
    }).catch((err)=>{
        console.log(err)
    })
};

module.exports = connect ; 