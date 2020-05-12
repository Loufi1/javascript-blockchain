const Blockchain = require('./src/blockchain/blockchain');

const loufiCoin = new Blockchain();

loufiCoin.pushTransaction('0x77991232', '0x73e34u82', 10);
loufiCoin.pushTransaction('0x34993342', '0x5d838u02', 1);
loufiCoin.pushTransaction('0x73790b3a', '0a7ce34f8p', 12);

loufiCoin.mineNewBlock('loufi@gmail.com');

loufiCoin.mineNewBlock('jean@gmail.com');

loufiCoin.mineNewBlock('jean@gmail.com');

loufiCoin.mineNewBlock('loufi@gmail.com');

console.log('loufi@gmail.com -> ', loufiCoin.getAddrBalance('loufi@gmail.com'), ' loufiCoin');

console.log('jean@gmail.com -> ', loufiCoin.getAddrBalance('jean@gmail.com'), ' loufiCoin');