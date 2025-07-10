const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    categoryName:{
        type:String,
        required:true
    },

    categoryDescription:{
        type:String
        
    },

    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
});


module.exports = mongoose.model('category', categorySchema);

