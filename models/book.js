const mongoose=require('mongoose')
const coverImageBasePath ='uploads/bookCovers'

const booksSchema=new mongoose.Schema({
    title:{type:String,required:true},
    discription:{type:String},
    publishDate:{type:Date,required:true},
    pageCount:{type:Number,required:true},
    createdAt:{type:Date,required:true,default:Date.now},
    coverImageName:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId , required:true,ref:'Author'}

})

module.exports=mongoose.model('Book',booksSchema)
module.exports.coverImageBasePath=coverImageBasePath