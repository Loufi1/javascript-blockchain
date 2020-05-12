const Blockchain = require('./src/blockchain/blockchain');
const Block = require('./src/blockchain/block');

const loufiCoin = new Blockchain();

loufiCoin.addNewBlock(new Block(loufiCoin.length(), loufiCoin.getLastBlock().signature, 'Hello World !'));
loufiCoin.addNewBlock(new Block(loufiCoin.length(), loufiCoin.getLastBlock().signature, 'Bonjour Le Monde !'));

console.log(loufiCoin);