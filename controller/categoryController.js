const categoryModel = require("../models/categoryModel");

// POST || Create Category
const createCategoryController = async(req,res)=>{
    try {
        const {title, imageUrl } = req.body;

        // Validations
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Above fields are required"
            })
        }

        const newCategory = new categoryModel({ title, imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"New Category created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Create Category API",
            error
        })
    }
}

// GetAll
const getAllCatContoller = async(req,res)=>{
      try {
        const getCat = await categoryModel.find({});
        if(!getCat){
            return res.status(404).send({
                success:false,
                message:"No Category found"
            })
        }
        res.status(201).send({
            success:true,
            categories:getCat.length,
            getCat
        })
      } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Get Category API",
            error
        })
      }
}

// Update Category
const updateCatController = async(req,res)=>{
   try {
    const {id} = req.params
    const {title,imageUrl} = req.body
    const updateCat = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
    if(!updateCat){
        return res.status(500).send({
            success:false,
            message:"No category found"
        })
    }
    res.status(201).send({
        success:true,
        message:"Category updated Successfully"
    });
   } catch (error) {
    console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Update Category API",
            error
        })
   }
}

// Delete Category
const deleteCatController = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:"Please provide Category Id"
            })
        }
        const category = await categoryModel.findByIdAndDelete(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:"No category found with this id"
            })
        }
        res.status(201).send({
             success:true,
             message:"Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Update Category API",
            error
        })
    }
}
module.exports = {createCategoryController,getAllCatContoller,updateCatController,deleteCatController}