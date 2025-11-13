const express = require('express');
const dotenv  = require('dotenv');
dotenv.config();
const connect = require('./connection.js')
const app = express();
const cookieparser = require('cookie-parser');
const cors = require('cors');



const authRouter = require('./Routes/auth.js')
const productRouter = require('./Routes/product.js');
const categoryRouter = require('./Routes/category.js');
const orderRoutes = require('./Routes/order.js');


app.use(cors({  
    origin:'http://localhost:5173',
    credentials:true
}));

app.use(express.json());
app.use(cookieparser());

app.use('/api/v1', authRouter);
app.use('/api/v1', productRouter);  
app.use('/api/v1', categoryRouter);  
app.use('/api/v1', orderRoutes);

// app.get('/get', (req,res)=>{
//     return res.json({message:'true'})
//  })

app.listen(process.env.PORT, ()=>{
 console.log(`server is running on port ${process.env.PORT}`);
 connect();
});



