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
const cloudinary = require('cloudinary');
// for fileUplaod
const fileUplaod = require('express-fileupload');

app.use(express.json());
app.use(cookieparser());

app.use(cors({  
    origin:'http://localhost:5173',
    credentials:true
}));


// fileUplaod
app.use(fileUplaod({
    useTempFiles:true
}))

// clodinary configuration......
cloudinary.config({
    cloud_name:'dxwyxjptu',
    api_key:729431512212859,
    api_secret:'lvXbTNhz9l9KSaCwbeChC9AyFl0'
})

app.use('/api/v1', authRouter);
app.use('/api/v1', productRouter);  
app.use('/api/v1', categoryRouter);  

// app.get('/get', (req,res)=>{
//     return res.json({message:'true'})
//  })

app.listen(process.env.PORT, ()=>{
 console.log(`server is running on port ${process.env.PORT}`);
 connect();
});

