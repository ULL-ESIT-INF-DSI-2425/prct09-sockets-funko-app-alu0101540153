import net from 'net';
import * as readline from 'readline';

/**
 * para poder leer de la interfaz
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * conectarse al servidor
 */
const client = net.connect({ port: 60300 }, () => {
    console.log('=== conectado al servidor de chat');
});

/**
 * funcion para manejar los mensajes que llegan del servidor
 * @param  data - el mensaje que llega del servidor
 * @returns void
 */
client.on('data', (data) => {
    try {
        const message = JSON.parse(data.toString().trim());
        
        switch (message.type) {
            case 'welcome':
                console.log(`bienvenop Tu ID es ${message.id}`);
                console.log(`clients conectados: ${message.connectedClients}`);
                break;
                
            case 'message':
                console.log(`${message.from}: ${message.text}`);
                break;
                
            case 'disconnect':
                console.log(`el cliente ${message.id} se desconecto`);
                console.log(`clients conectados ${message.connectedClients}`);
                break;
                
            default:
                console.log('error: no conozco ese mensaje : ', message);
        }
    } catch (error) {
        console.error('no se pudo procesar el mensaje del server', error);
    }
});

/**
 * funcion para manejar los errores
 * @param  error - el error que ocurre
 * @returns void
 */
rl.on('line', (input) => {
    if (input === '') return;
    
    const message = JSON.stringify({
        type: 'chat',
        text: input
    }) + '\n';
    
    client.write(message);
});

/**
 * funcion para manejar los errores
 * @param  error - el error que ocurre
 * @returns void
 */
client.on('close', () => {
    console.log('=== desconectado del servidor');
    rl.close(); 
    process.exit(0); 
});