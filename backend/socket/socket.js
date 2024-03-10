import { Server } from "socket.io";
import http from 'http'
import express from "express";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})

export const getRecevierSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('User Connected.', socket.id)

    const userId = socket.handshake.query.userId
    if (userId != 'undefined') userSocketMap[userId] = socket.id

    // To send events to all the connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    // .on() is used to listen to the events and can be used on both server as well as client side.
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { app, io, server }