//Responsáveis: Alexandre e Felipe

using System;
using System.Net;
using System.Collections;
using System.Text;
using System.Net.Sockets;

namespace ClienteTcpIp
{
    class Cliente
    {
        static void Main(string[] args)
        {
            TcpClient cliente = new TcpClient("192.168.137.1", 3000);
            Console.WriteLine("TENTANDO SE CONECTAR AO SERVIDOR\n");
            NetworkStream n = cliente.GetStream();
            Console.WriteLine("LIGADO\n");
            string ch = "666 777 20 135 9000 420 500 250";
            /*
            Governador 1
            Governador 2
            Votos em branco
            Votos nulos
            Presidente 1
            Presidente 2
            Votos em branco
            Votos nulos
            */
            byte[] message = Encoding.UTF8.GetBytes(ch);
            n.Write(message, 0, message.Length);
            Console.WriteLine("-----------------------ENVIADO-----------------------");
            Console.ReadKey();
        }
    }
}