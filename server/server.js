const path =require("path");
const publicPath=path.join(__dirname,'../public');
const http=require("http")
const express=require("express");
const socketIO=require("socket.io")
var app=express(); 
var server=http.createServer(app);
var io=socketIO(server)

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
    console.log("new user connected");
    
    socket.emit('newMessage',{
        from:'dana',
        text:'hey, its new message',
        createdAt:'123'
    });
    
    socket.on('createMessage',(message) =>{
        console.log('createMessage', message)
    })
    
    socket.on('disconnect',() =>{
    console.log("user has disconnected")
    })
})
server.listen(process.env.PORT,process.env.IP,function(){
    console.log('server has started')
})

