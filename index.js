const API_SERVER_IS_RUNNING = require('./src/utils/error-msg').API_SERVER_IS_RUNNING;
const API_SERVER_ERROR = require('./src/utils/error-msg').API_SERVER_ERROR;
const NOT_ALLOWED_BY_CORS = require('./src/utils/error-msg').NOT_ALLOWED_BY_CORS;

const startP2PServer = require('./src/network/network').startServer;
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const Wallet = require('./src/wallet/wallet');

const port = 4200;

const server = express();

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', function (req, res) {
    res.send('Welcome to javascript based blockchain API !')
});

let wallet = null;

server.post('/createWallet', function (req, res) {
    if (req.body.isNewWallet) {
        wallet = new Wallet();
        console.log('[BLOCKCHAIN]\tINFO: new wallet created');
    } else {
        wallet = new Wallet(req.body.privateKey);
        console.log('[BLOCKCHAIN]\tINFO: existent wallet opened');
    }
    res.send('Wallet created');
});

server.get('/getWalletSold', function (req, res) {
    res.send(wallet.getBalance().toString());
});

server.post('/sendCoinsTo', function (req, res) {
    wallet.sendCoinTo(req.body.toPublicKey, req.body.amount);
    res.send('Transaction made');
});

server.listen(port, (err) => {
    if (err) {
        return console.log(API_SERVER_ERROR, err)
    }
    console.log(API_SERVER_IS_RUNNING, port);
});

startP2PServer().then();