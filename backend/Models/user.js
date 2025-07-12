const mongoose = require('mongoose');

const User = mongoose.Schema({
      username:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      address:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      },
      profileImage:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
      },
      role:{
        type:String,
        default:"user",
        enum:['user','admin']
      }
      ,
      fav:[
        {
         type:mongoose.Types.ObjectId,
         ref:'books'
        }                           //fav is a array of all fav book of that user which   will refer to book schema having all book details..obj id will be of book and each obj will contain one book all information which we will extract using .populate()
      ],
      cart: [ 
           {
             type: mongoose.Types.ObjectId,
             ref:'books'
           }
      ] ,
      purchase: [{
          type: mongoose.Types.ObjectId,
          ref:'books'
        }],
},
  {timestamps: true} 
);
module.exports = mongoose.model('user',User);