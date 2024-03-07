const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on('connection', socket => {
    console.log('tiiiii')
    socket.on("callUser", ({ userToCall, signalData, from }) => {
        console.log('call user',userToCall, signalData, from)
        io.to(userToCall).emit("callUser", { signal: signalData, from, name: socket.name });
    });

    socket.on("answerCall", (data) => {
        console.log('answerCall',data)
        io.to(data.to).emit("callAccepted", data.signal)
    });
});