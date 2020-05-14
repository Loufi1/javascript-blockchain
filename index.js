const LoufiCoin = require('./src/blockchain/blockchain');
const Wallet = require('./src/wallet/wallet');

const wallet = new Wallet();

wallet.sendCoinTo('loufi', 1);

LoufiCoin.mineNewBlock('loufi');

console.log(wallet.getBalance());
