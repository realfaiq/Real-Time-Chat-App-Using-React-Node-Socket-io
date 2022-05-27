const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
//Initializing the socket io server
const { Server } = require('socket.io');

app.use(cors());

//Creating the Socket Io server
const server = http.createServer(app);
//Passing the socket sever to the io server
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket)=> {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User With Id: ${socket.id} Joined Room ${data}`);
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("recieve_message", data);
    })

    //Listening for the Disconnection of User
    socket.on("disconnect", ()=> {
        console.log(`User Disconnected: ${socket.id} `);
    })
})


server.listen(3001, ()=> {
    console.log("SERVER IS RUNNING");
});