//Require your express module
const express =require("express");
var path = require('path')
//Initialize your express app
const app= express();

//Application level middleware--> works for all routes
//order of middlewares matter
app.listen(3000,()=>{
    console.log("Server is running on 3000");
});
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/home.html");
});
app.get('/home.html',(req,res)=>{
    res.sendFile(__dirname+"/home.html");
});
app.get('/login.html',(req,res)=>{
    res.sendFile(__dirname+"/login.html");
});
app.get('/about.html',(req,res)=>{
    res.sendFile(__dirname+"/about.html");
});
// app.get('/valid.html',(req,res)=>{
//     res.sendFile(__dirname+"/valid.html");
// });
app.get('/invalid.html',(req,res)=>{
    res.sendFile(__dirname+"/invalid.html");
});
/*
app.get('*',(req, res)=>{
    res.sendFile(__dirname+"/404.jpg");
  });
  */




app.post('/login.html', (req,res)=>{
    if(req.body.uname=="admin" && req.body.pwd=="manager"){
        res.sendFile(__dirname+"/valid.html");
    }
    else{
        res.sendFile(__dirname+"/invalid.html");
    }
});

app.use((req,res,next)=>{
    const err= new Error("404 Page Not Found");
    err.status=404;
    next(err);
});
//Error handling Middleware
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});