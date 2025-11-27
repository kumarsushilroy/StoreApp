
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    company:{
        type:String
    },
    price:{
        type:Number
    },
    photo:{
        type:String 
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    stock:{
        type:Number
    },
    description:{
        type:String
    }
    
})

module.exports = mongoose.model('product', productSchema) 