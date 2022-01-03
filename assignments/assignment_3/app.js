const express = require('express');
const app= express();
const faker=require('faker');
var bodyparser=require('body-parser');

app.set('views','./views')
app.set('view engine', 'ejs')
const fs = require('fs');

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));

var users=[];
for(let i=0;i<5;i++){
    users.push({
        name:faker.name.findName(),
        email:faker.internet.email()
    })
}

app.get('/',(req,res)=>{
    res.render('index',{users});  
});

app.get('/form',(req,res)=>{
    res.render('form');  
});

app.post('/user/add',(req,res)=>{
    // console.log(req.body);
    users.push({
        name:req.body.name,
        email:req.body.email
    })
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log("server is running at 3000")});