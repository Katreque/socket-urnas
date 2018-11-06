//Responsável: Renan Verissimo

const net = require('net');
const evento = require('events');
const eventoEnvioTse = new evento();

let votos = [0, 0, 0, 0, 0, 0, 0, 0];
let urnasAvaliadas = 0;

eventoEnvioTse.once('envioVotosTse', () => {
    console.log('Governador 01: ', votos[0]);
    console.log('Governador 02: ', votos[1]);
    console.log('Brancos: ', votos[2]);
    console.log('Nulos: ', votos[3]);

    let votosPresidente = votos.slice(4, 8);

    const clienteTSE = net.createConnection({host: "192.168.137.109", port: 5010}, () => {
        let votosFormatados = "";
        votosPresidente.forEach((voto) => {
            votosFormatados += voto.toString() + " ";
        })

        clienteTSE.setEncoding('utf8');
        clienteTSE.write(votosFormatados);
        clienteTSE.end();
    });
})

const server = net.createServer((socket) => {
    socket.setEncoding('utf8');
    socket.on('data', (res) => {
        //console.log(res);

        let i = 0;
        let _votosRecebidos = res.split(' ');
        _votosRecebidos.forEach(voto => {
            votos[i] += Number(voto);
            i++;
        });

        socket.write('200 OK.');
        socket.end();

        urnasAvaliadas++;

        if (urnasAvaliadas === 2) {
            eventoEnvioTse.emit('envioVotosTse');
        }
    })

})

server.on('error', (err) => {
    console.log(err);
})

server.listen(3000, '192.168.137.1', () => {
    console.log('On', server.address().port);
})