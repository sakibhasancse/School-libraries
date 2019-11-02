if( process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express =require('express')
const app =express()
const expressLayouts =require('express-ejs-layouts')
const bodyparser=require('body-parser')
const methodoverride =require('method-override')

const indexRouter=require('./routes/index')
const authorsRouter=require('./routes/authors')
const  bookRouter=require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodoverride('_method'))
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}))


const mongoose=require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
useNewUrlParser:true,useUnifiedTopology: true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Database Connected :)'))

app.use('/',indexRouter)
app.use('/authors',authorsRouter)
app.use('/books',bookRouter)




app.listen(process.env.PORT ||3000)

