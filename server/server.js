const path =require("path");
const publicPath=path.join(__dirname,'../public');
const http=require("http")
const express=require("express");
const socketIO=require("socket.io")
const{generateMessage}=require("./utils/message")
var app=express(); 
var server=http.createServer(app);
var io=socketIO(server)

app.use(express.static(publicPath));

io.on('connection',(socket) =>{
    console.log("new user connected");
    
    socket.emit('newMessage',generateMessage('admin','Welcome to chat app'))
     
    socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'))
    
    
    socket.on('createMessage',(message) =>{
        console.log('createMessage', message)
         io.emit('newMessage',generateMessage(message.from,message.text))
    
    })
    
    socket.on('disconnect',() =>{
    console.log("user has disconnected")
    });
   
})
server.listen(process.env.PORT,process.env.IP,function(){
    console.log('server has started')
})

