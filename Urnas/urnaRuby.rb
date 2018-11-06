#Responsáveis: Victor, Marcus Vinicius e Robson

require 'socket'

sockets = TCPSocket.open('192.168.137.1', 3000)

puts"Iniciando envio dos votos..."

sockets.puts"6000 5000 1000 200 500 20 300 456"

while message = sockets.gets
 puts message.chomp
end

s.close

puts"Fechando..."