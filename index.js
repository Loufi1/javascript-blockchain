const API_SERVER_IS_RUNNING = require('./src/utils/error-msg').API_SERVER_IS_RUNNING;
const API_SERVER_ERROR = require('./src/utils/error-msg').API_SERVER_ERROR;

const LoufiCoin = require('./src/blockchain/blockchain');
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
    wallet = null;
    if (req.body.isNewWallet) {
        wallet = new Wallet();
        console.log('[BLOCKCHAIN]\tINFO: new wallet created');
        res.send({
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
        })
    } else {
        wallet = new Wallet(req.body.privateKey, req.body.publicKey);
        console.log('[BLOCKCHAIN]\tINFO: existent wallet opened');
        res.send({
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
        })
    }
});

server.get('/getWalletSold', function (req, res) {
    if (wallet)
        res.send(wallet.getBalance().toString());
});

server.post('/sendCoinsTo', function (req, res) {
    res.send(wallet.sendCoinTo(req.body.toPublicKey, req.body.amount));
});

server.get('/getBlockchain', function (req, res) {
    res.send(LoufiCoin.chain);
});

server.get('/walletTransactions', function (req, res) {
    res.send(LoufiCoin.getAddrTransactions(req.query.publicKey));
});

server.get('/mineNewBlock', function (req, res) {
    LoufiCoin.mineNewBlock(req.query.publicKey);
    res.send('Block mined.');
});

server.listen(port, (err) => {
    if (err) {
        return console.log(API_SERVER_ERROR, err)
    }
    console.log(API_SERVER_IS_RUNNING, port);
});