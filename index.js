const LoufiCoin = require('./src/blockchain/blockchain');
const Wallet = require('./src/wallet/wallet');

const wallet = new Wallet();

LoufiCoin.mineNewBlock(wallet.publicKey);
LoufiCoin.mineNewBlock(wallet.publicKey);

console.log('\x1b[32m[WALLET]\x1b[0m\tBALANCE: ', wallet.getBalance());