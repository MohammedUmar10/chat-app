// For handling socket io connections 
// const io = require('socket.io')()
const http= require('http')
const users={}
console.log("hi")
const express=require("express")
const app=express()
const hn='127.0.0.1'
const port=8000
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const { format } = require("path")
app.use(express.static('static'))
app.use(express.urlencoded())
io.on("connect_error", (err) => 
{
    console.log(`connect_error due to ${err.message}`);
});

io.on('connection',(socket)=>
{
    console.log("conn")
    socket.on('new_user_joined',nam=>
    {
        users[socket.id]=nam;
        // socket.broadcast.emit('user_joined',nam)
        socket.broadcast.emit('user_joined',{nam:users[socket.id]})
        console.log(users[socket.id])
        // {nam:users[socket.id]}
        // io.emit('user_joined',nam)
    })
})
io.on('connection',(socket)=>
{
    socket.on('send',message=>
    {
        socket.broadcast.emit('receive',{message:message,nam:users[socket.id]})
        // io.emit('receive',{message:message,nam:users[socket.id]})
    })
})
io.on('connection',(socket)=>
{
    socket.on('disconnect',message=>
    {
        socket.broadcast.emit('went',users[socket.id])
        // io.emit('went',users[socket.id])
        delete users[socket.id]
    })
})
// app.get('/',(req,res)=>
// {
//     res.status(200).sendFile(__dirname+'/index.html')
// })
server.listen(port,()=>
{
    console.log("Server is running at "+hn+":"+port)
})
// http.listen(8000, function(){
//     console.log('listening on *:8000');
// });