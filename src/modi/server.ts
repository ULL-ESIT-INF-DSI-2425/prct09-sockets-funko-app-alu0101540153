import net from 'net';

let coneccionesActivas: net.Socket[] = [];
let clientIdCounter = 1;

/**
 * creacion de un servidor para comunicarse
 */
const server = net.createServer((connection) => {
    console.log('### un cliente se ha conectado.');
    
    coneccionesActivas.push(connection);

    const clientId = clientIdCounter;
    clientIdCounter++;
    
    connection.write(JSON.stringify({
        type: 'welcome',
        id: clientId,
        connectedClients: coneccionesActivas.length
    }) + '\n');

    

    connection.on('data', (data) => {
        try {
            const rawMessage = data.toString().trim();
            const message = JSON.parse(rawMessage);
            
            if (message.type === 'chat') {
                console.log(`${clientId} ha enviado: ${message.text}`);
                
                const broadcastMessage = JSON.stringify({
                    type: 'message',
                    from: clientId,
                    text: message.text,
                }) + '\n';
                
                coneccionesActivas.forEach((socket) => {
                    if (socket !== connection) { 
                        socket.write(broadcastMessage);
                    }
                });
            }
        } catch (error) {
            console.error(`no pude pasar eel mensaje ${clientId}:`, error);
        }
    });

    connection.on('close', () => {
        console.log(`${clientId} se ha desconectado.`);
        coneccionesActivas = coneccionesActivas.filter(conn => conn !== connection);
        
        const disconnectMessage = JSON.stringify({
            type: 'disconnect',
            id: clientId,
            connectedClients: coneccionesActivas.length
        }) + '\n';
        
        coneccionesActivas.forEach(socket => {
            socket.write(disconnectMessage);
        });
    });
});


/**
 * hacer que escuche de un puerto especifico
 */
server.listen(60300, () => {
    console.log('Waiting for clients to connect. Puerto 60300');
});