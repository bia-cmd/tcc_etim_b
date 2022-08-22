const mysql = require('mysql12/promise');

 const bd_usuario = 'm120_tcc_g4_us';
 const bd_senha = 'htr201';
 const bd_servidor = 'http://10.67.22.216/phpmyadmin';
 const bd_porta= '3396';
 const bd_banco = 'm120_tcc_g4_bd';
let connection;

const config = {
    host: bd_servidor,
    port: bd_porta,
    user: bd_usuario,
    password: bd_senha,
    databasa:bd_banco,
    witForConnections : True,
    connectionLimit:10,
    queueLimit:0,


}


try{
    connection = mysql.createPool(config);

    console.log('Chamou conexão MySql!');
}catch (error){
    console.log(error);
}
