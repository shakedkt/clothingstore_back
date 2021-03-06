const app = require("./app.js");
const http = require("http").createServer(app);
var io = module.exports.io = require('socket.io')(http)

const SocketManager = require('./socket/socketManager')

io.on('connection', SocketManager)


const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || 3000);

app.set("port", port);
http.listen(port, () => {
  console.log('Server is running on port: ' + port)
});