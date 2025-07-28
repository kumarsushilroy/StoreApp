
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

   shippingInfo:{
    
    address:{
        type:String
    },
    city:{
        type:String
    },
    zipCode:{
        type:String
    },
    country:{
        type:String
    }
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   },
   orderItems:[
    {
        name:{
            type:String
        },
        price:{
            type:Number
        },
        quantity:{
            type:Number
        },
        image:{
            type:String
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
        
    }
   ],

  paymentMethod:{
    type:String,
    required:[true, 'please select payment method'],
    enum:{
        values:['COD', 'CARD'],
        message:'please select cod or card'
    }
  },
  paymentInfo:{
    id:String,
    status:String
  },
  itemsPrice:{
    type:Number
  },
  taxAmount:{
    type:Number
  },
  shippingAmount:{
    type:Number
  },
  totalAmount:{
    type:Number
  },
  orderStatus:{
    type:String,
    enum:{
        values:['Processing', 'Shipped', 'Delivered'],
        message:'Please select correct order status'
    },
    default:'Processing'
  },
  deliveredAt:Date
}, {
    timestamps:true
})


module.exports = mongoose.model('order', orderSchema);