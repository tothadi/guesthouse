function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = function(app, user) {
    const debug = require('debug')('guesthouse:server');
    const http = require('http');
    const port = user === 'client' ? normalizePort(process.env.CLIENT_PORT || '3000') : normalizePort(process.env.ADMIN_PORT || '5000');

    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port, '0.0.0.0');
    server.on('error', onError);
    server.on('listening', onListening);

    console.log('Server listening on port ' + port);

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}


