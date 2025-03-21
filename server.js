const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');

//Importar rutas
//const users = require('./routes/userRoutes');


const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.disable('x-powered-by');

app.set('port',port);

server.listen(3000,'192.168.200.9' || 'localhost', function(){
    console.log('Aplicación JuviExpress Backend '+process.pid+' iniciada...')
});

app.get('/',(req,res)=>{
    res.send('JuviExpress');
});

app.get('/test',(req,res)=>{
    res.send('JuviExpress-Test');
});


//Errores
app.use((err, req, res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});