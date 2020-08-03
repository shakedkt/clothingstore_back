const io = require('../server.js').io
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

module.exports = function (socket) {

    socket.on('join', ({ room, name }, callback) => {
        const { error, user } = addUser({ id: socket.id, room, name })
        if (error) return callback(error)

        socket.join(user.room)

        socket.emit("message", { content: `${user.name}, welocme to the chat room`, sender: 'bot' })
        socket.broadcast.to(user.room).emit('message', { content: `${user.name} have joined the chat` });

        
        console.log('some connected');
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log('message', message);
        io.to(user.room).emit('message', { content: message.content, sender: user.name })

        callback()
    })

    // when disscoenected
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', { sender: 'bot', content: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
        console.log('someone disconnected');
    })
}