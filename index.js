const express = require('express');

const cors = express ('cors');
const router = require ('.routes/routes');

const app = express();
// const porta = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());
app.use(router);

const porta = 3333;
// define a porta do servidor - ou ultiliza a oferecida pelo serviço de hospedagem
app.listen(porta, ()=> {
      console.log('Servidor iniciado na porta:' + porta);

});
app.get('/',(request, response) =>{
      response.send('Hello world');

});