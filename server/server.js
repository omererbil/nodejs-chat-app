const path =require("path");
const publicPath=path.join(__dirname,'../public');
const express=require("express");
var app=express();

app.use(express.static(publicPath));

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server has started')
})

