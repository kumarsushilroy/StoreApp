const productModel = require("../Models/product.js");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
  try {
    // console.log('request body==', req.body)
    const file = req.files.photo;

    // console.log('FILE===', file);

    const result = await cloudinary.uploader.upload(file.tempFilePath);
    // console.log('RESULT==', result);

    const cloudinaryRes = await cloudinary.uploader.upload(file.tempFilePath);
    //    console.log('cloudinary Res==', cloudinaryRes);
    if (!cloudinaryRes || cloudinary.error) {
      console.log(cloudinaryRes.error);
    }

    const { name, company, price, categoryId } = req.body;
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
    });
    const product = await makeProduct.save();
    return res.status(200).json({
      message: "product created",
      product,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res.status(400).json({
      message: "something went wrong !",
      error,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const page = req.query.page || 1;
    const itemPerPage = 10;
    const skip = (page - 1) * itemPerPage;

    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const count = await productModel.countDocuments(query);

    // const allProducts = await productModel.find(query).limit(itemPerPage).skip(skip);

    // const allProducts = await productModel.aggregate([
    //     {$lookup:{
    //         from: 'users',
    //         localField:'userId',
    //         foreignField:'_id',
    //         as:'userInfo'
    //     }}
    // ])

    const allProducts = await productModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      {
        $lookup:{
            from:'categories',
            localField:'categoryId',
            foreignField:'_id',
            as:'category'
        }
      },
      {$unwind:{
        path:'$userInfo',
        preserveNullAndEmptyArrays:true
      }},
      {$unwind:{
        path:'$category',
        preserveNullAndEmptyArrays:true
      }}
    ]);

    const pageCount = Math.ceil(count / itemPerPage);

    console.log("ALLProductsssss", JSON.stringify(allProducts, null, 2));

    return res.status(200).json({
      message: "got all products",
      pagination: {
        count,
        pageCount,
      },
      allProducts,
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
      limit = 10           // pagination
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

module.exports = { createProduct, allProducts };
