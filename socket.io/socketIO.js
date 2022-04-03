module.exports = (io) => {
  console.log('Init socket.io');

  io.on('connection', socket => {
    console.log('User connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.onAny((event, msg) => {
      console.log(`ANY ${event} ${msg}`);
    });
  });

  setInterval(() => {
    // console.log(`[${new Date().toLocaleString()}] Emit test`);
    io.emit('test', {test: '123'});
  }, 30000);
}