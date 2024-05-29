import path from 'node:path';
import express from "express"
import { Server } from "socket.io"
import http from 'http'

const app = express()
const PORT = 3000
const server = http.createServer(app)
const io = new Server(server)
const __dirname = path.dirname('index2.html')


app.get('/',(req,res)=>{
    res.sendFile('/index2.html',{root:__dirname})
})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

io.on("connection",(socket)=>{
    console.log('a user connected');
    socket.on('chat message',(message)=>{
        console.log('message: ',message)
        io.emit('chat message',message)
    })

    socket.on('join',(userId)=>{
        socket.join(userId)
        console.log('user joined room : ',userId)
    })

    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})
