const orderSchema = require('../Models/order.js');
const productSchema = require('../Models/product.js')

const createOrder = async(req,res)=>{
    
    try {
        const {shippingInfo, orderItems, paymentMethod, paymentInfo, itemsPrice, taxAmount, shippingAmount, totalAmount}=req.body;
        // if(!shippingInfo || !orderItems || !paymentMethod || !paymentInfo || !itemsPrice || !taxAmount || !shippingAmount || !totalAmount){
        //     return res.status(400).json({
        //         message:'all fields require !'
        //     })
        // }
        const order = new orderSchema({shippingInfo, user:req.user._id, orderItems, paymentMethod, paymentInfo, itemsPrice, taxAmount, shippingAmount, totalAmount});
        const savedOrder = await order.save();
        return res.status(200).json({
            success:true,
            message:'order created successfully',
            savedOrder
        });
    } catch (error) {
        return res.status(400).json({
          success:false,
          message:'something went wrong !',
          error:error.message
        })
    }
}

const getAllOrders = async (req,res)=>{
    try {
        const orders = await orderSchema.find().populate('user');
        return res.status(200).json({
            success:true,
            message:'got all orders successfully',
            orders 
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

const singleOrder = async (req,res)=>{
    try {
        const orderDetail = await orderSchema.findById(req.params.id).populate('user')
        return res.status(200).json({
            success:true,
            orderDetail:orderDetail
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

const updateOrder = async (req,res)=>{
    
    try{
      const order = await orderSchema.findById(req.params.id);
      console.log('order== ', order);
      if(!order){
        return res.json({
            message:'order not found with this Id'
        })
      }
       order?.orderItems.forEach(async(item)=>{
        const product = await productSchema.findById(item?.product.toString());
        product.stock = product.stock - item.quantity;

        await product.save();
      });
      
      order.orderStatus = req.body.status;
      order.deliveredAt = Date.now();
     const savedOrder = await order.save();
     return res.status(200).json({
        success:true,
        message:'order updated successfully !',
        savedOrder
     })

    }catch(error){
      return res.status(400).json({
        success:false,
        message:'something went wrong !',
        error:error.message
      })
    }
}

// logged in user orders
const userOrders = async (req,res)=>{
    try {
        const orderOfUser = await orderSchema.find({user:req.user._id});
        console.log(orderOfUser)
        return res.status(200).json({
            success:true,
            orders:orderOfUser
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'something went wrong !',
            error:error.message
        })
    }
}

module.exports = {createOrder, getAllOrders, singleOrder, updateOrder, userOrders};