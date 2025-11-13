const productModel = require("../Models/product.js");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  
  try {
    console.log('request body==', req.body)
    const file = req.files.photo;

    // console.log('FILE===', file);

    const result = await cloudinary.uploader.upload(file.tempFilePath);
    // console.log('RESULT==', result);

    const cloudinaryRes = await cloudinary.uploader.upload(file.tempFilePath);
    //    console.log('cloudinary Res==', cloudinaryRes);
    if (!cloudinaryRes || cloudinary.error) {
      console.log(cloudinaryRes.error);
    }

    const { name, company, price, categoryId, stock } = req.body;
    const userId = req.user._id;

    // console.log('USERRRR from product', userId)

    if (!name || !company || !price) {
      return res.status(400).json({
        message: "please fill all fields",
      });
    }

    const makeProduct = new productModel({
      name,
      company,
      price,
      photo: result.url,
      userId,
      categoryId,
      stock
    });
    const product = await makeProduct.save();
    return res.status(200).json({
      message: "product created",
      product
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).json({
      message: "something went wrong !",
      error,
    });
  }
};


const allProducts = async (req,res)=>{
   
   const {
      company,
      search = '',         // search term
      category,            // optional filter
      minPrice, maxPrice,  // optional filter
      inStock,             // optional boolean
      page = 1,            // pagination
      limit = 40          // pagination
    } = req.query;

    console.log('queryyyyy',req.query)
    const query = {};

    //search by name
    if (search) {
      query.company = { $regex: search, $options: 'i' } ; // case-insensitive
    }

    if(company){
      query.company = company
    }

        // Filter by category
    if (category) {
      query.category = category;
    }

   // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

        // Filter by inStock
    if (inStock !== undefined) {
      query.inStock = inStock === 'true';
    }

       // Pagination
    const skip = (page - 1) * limit;

    const products = await productModel.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await productModel.countDocuments(query);

    console.log('PRODUTDdd', products)
     res.json({
      total,
      page: parseInt(page),
      pageSize: products.length,
      products,
    });

}

const singleProduct = async (req,res)=>{
  try{
     const singleProd = await productModel.findById(req.params.id);
     console.log('SingleProd== ', singleProd);
     return res.status(200).json({
      success:true,
      singleProd
     })
  }catch(error){
    return res.status(400).json({
      success:false,
      message:'something went wrong !',
      error:error.message
    })
  }
}

module.exports = { createProduct, allProducts, singleProduct };
