const methodOverride=require('method-override');
const express = require('express');
const app = express();
var bodyparser=require('body-parser');
app.set('views','./views')
app.set('view engine', 'ejs')
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/assignment_4');
app.use(express.static("public"));
app.use(bodyparser());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const userDB=require('./model/model');

//db:Assignment-4
//collection:userDB
//fields:[{name,email,isPramoted},{},{}]


app.get('/',async (req,res)=>{
    var data=await userDB.find();
    res.render('index',{data});  
});
app.put("/users/:id/", async (req, res) => {
    await userDB.updateOne({ _id: req.params.id }, [
        { $set: { isPromoted: { $not: "$isPromoted" } } },
    ]);
    res.redirect("/");
});

app.get('/form',(req,res)=>{
    res.render('form');  
});

app.post('/users/add',async (req, res) => {
    newuser = {
        name: req.body.name,
        email: req.body.email,
        isPromoted: null
    };
    await userDB.create(newuser);
    res.redirect('/')
})
app.delete("/users/:id/", async (req, res) => {
    await userDB.deleteOne({ _id: req.params.id });
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("server is running at 3000")});