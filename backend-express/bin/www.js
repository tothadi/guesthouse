if (process.env.NODE_ENV === 'development') {
    require('../config/config');
}

console.log(process.env.ADMIN_PORT);
const { client, admin } = require('../app');
const clientPort = normalizePort(process.env.CLIENT_PORT || '3000');
const adminPort = normalizePort(process.env.ADMIN_PORT || '5000');

function normalizePort(val) {
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
}

function server(app, port) {
    const debug = require('debug')('guesthouse:server');
    const http = require('http');

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

        var bind = typeof port === 'string'
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
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}

server(client, clientPort);
server(admin, adminPort);


