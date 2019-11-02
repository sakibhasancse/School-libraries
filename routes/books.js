const express=require('express')
const router =express.Router()
const multer =require('multer')
const path =require('path')
const Book =require('../models/book')
const uploadPath=path.join('public',Book.coverImageBasePath)
const Author =require('../models/authors')
const imageMimeTypes =['images/jpeg','images/png','images/gif']
const upload =multer({
    dest:uploadPath,
  fileFilter:(req,file,callback)=>{
    callback(null,imageMimeTypes.includes(file.mimetype))
  }

})

//all books Router


router.get('/',async(req,res)=>{
    res.send('all Books')
    
})

//new books Router
router.get('/new',async(req,res)=>{
    renderNewPage(res,new Book())
})

//Create books 
router.post('/' ,upload.single('cover'), async(req,res)=>{
    const fileName= req.file != null ? req.file.filename : null
    const book =new Book({
        title:req.body.title,
        author:req.body.author,
        publishDate:new Date(req.body.publishDate),
        pageCount:req.body.pageCount,
        coverImageBaseName:fileName,
        description:req.body.description
    })
   
try{
    const newBook =await book.save()
    res.redirect(`books`)
}
catch{
    renderNewPage(res,book,true)


}
})
async function renderNewPage(res,book,hasError =false){
    try {
        const authors=await Author.find({}) 
        const params ={
            authors:authors,
            book:book
        }
        if (hasError)params.errorMessage ='error Creating Book'
        res.render('books/new',params)

    } catch {
        res.redirect('/books')
    }
}



module.exports=router