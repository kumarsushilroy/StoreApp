
const categorySchema = require('../Models/category.js');

const createCategory = async (req,res)=>{

    try {
        const {categoryName, categoryDescription} = req.body;
        const userId = req.user._id

        console.log('USERRRR', userId)

        if(!categoryName || !categoryDescription){
            return res.status(400).json({ 
                message:"please fill all fields"
            })
        }

       const createCategory = new categorySchema({categoryName, categoryDescription, userId});
       const makeCategory = await createCategory.save();
       return res.status(200).json({
        message:'product created',
        makeCategory
       })

    } catch (error) {
        console.log('ERROR', error);
        return res.status(400).json({
            message:'something went wrong !',
            error
        })
    }
}

const getCategory = async (req,res)=>{
    try {
        let allCategory = await categorySchema.find({});
        return res.status(200).json({
            success:true,
            msg:'got all category', 
            allCategory
        })
    } catch (error) {
         console.log('ERROR', error);
        return res.status(400).json({
            message:'something went wrong !',
            error
        })
    }
}

module.exports = {createCategory, getCategory};