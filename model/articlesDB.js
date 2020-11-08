const mongoose = require('mongoose');
//setup Database  Schema for the project 
 let articleSchema =mongoose.Schema({
     title:{ 
         type:String,
         required:true
     },
     author:{ 
        type:String,
        required:true
    },
    body:{ 
        type:String,
        required:true
    },
    date:{ 
        type:String,
        required:false
    }
 })
 // set Article Model Shared 
 const Article=module.exports=mongoose.model('Article',articleSchema);