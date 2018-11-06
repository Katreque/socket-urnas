//Responsável: Renan Verissimo

process.stdin.setEncoding('utf8');
const net = require('net');

const cliente = net.createConnection({host: "192.168.137.1", port: 3000}, () => {
    cliente.setEncoding('utf8');
    cliente.write("80 70 60 50 40 30 20 10");
    cliente.end();
});

cliente.on('data', (data) => {
    console.log(data.toString());
});

// Leitura console.
/*process.stdin.on('readable', () => {
    const chunk = process.stdin.read();

    if (chunk !== null) {
        if (Number(chunk) === -1) {
            cliente.end();
            return process.stdin.end();
        }

        cliente.write(chunk.toString());
    }
})*/

cliente.on('end', () => {
    console.log('Base.');
})