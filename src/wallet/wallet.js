const Transaction = require('../blockchain/transaction');
const LoufiCoin = require('../blockchain/blockchain');
const Keygen = require('../utils/keygen');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const ERROR_INSUFFICENT_FUNDS = '\x1b[32m[WALLET]\x1b[0m\t\x1b[31mERROR: You have insufficient founds to perfom this transaction.\x1b[0m';

class Wallet {
    constructor(privateKey) {
        if (!privateKey) {
            const keygen = new Keygen();
            this.privateKey = keygen.getPrivateKey();
            this.publicKey = keygen.getPublicKey();
        } else {
            this.privateKey = privateKey;
            this.publicKey = ec.keyFromPrivate(privateKey).getPublic();
        }
    }

    sendCoinTo(to, amount) {
        const sold = LoufiCoin.getAddrBalance(this.publicKey);
        if (sold < amount) {
            console.log(ERROR_INSUFFICENT_FUNDS);
            return false;
        }
        const t = new Transaction(this.publicKey, to, amount);

        t.signTransaction(ec.keyFromPrivate(this.privateKey));
        LoufiCoin.pushTransaction(t);
        return true;
    }

    getBalance() {
        return LoufiCoin.getAddrBalance(this.publicKey);
    }
}

module.exports = Wallet;