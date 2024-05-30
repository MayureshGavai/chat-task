import path from 'node:path';
import express from "express"
import { Server } from "socket.io"
import http from 'http'

const app = express()
const PORT = 3000
const server = http.createServer(app)
const io = new Server(server)
const __dirname = path.dirname('index.html')


app.get('/',(req,res)=>{
    res.sendFile('/index.html',{root:__dirname})
})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

io.on("connection",(socket)=>{
    console.log('a user connected');
    socket.on('chat message',(message)=>{
        io.emit('chat message',message)
        // console.log('message: ',message)
    })

    socket.on('new room',(room)=>{
        io.emit('new room',room)
        console.log('new room created: ',room.roomname)
    })


    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})