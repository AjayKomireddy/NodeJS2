const mongoose= require('mongoose');
const schema=mongoose.Schema;

const userschema=new schema({
    name:String,
    email:String,
    isPramoted:Boolean
})

const userDB=mongoose.model('userDB',userschema);
module.exports=userDB;