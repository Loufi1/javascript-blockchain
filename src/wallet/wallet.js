const Transaction = require('../blockchain/transaction');
const LoufiCoin = require('../blockchain/blockchain');
const Keygen = require('../utils/keygen');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Wallet {
    constructor(privateKey) {
        if (!privateKey) {
            const keygen = new Keygen();
            this.privateKey = keygen.getPrivateKey();
            this.publicKey = keygen.getPublicKey();
        } else {
            this.privateKey = ec.keyFromPrivate(privateKey);
            this.publicKey = this.privateKey.getPublic('hex');
        }
    }

    sendCoinTo(to, amount) {
        const t = new Transaction(this.publicKey, to, amount);

        t.signTransaction(ec.keyFromPrivate(this.privateKey));
        LoufiCoin.pushTransaction(t);
    }

    getBalance() {
        return LoufiCoin.getAddrBalance(this.publicKey);
    }
}

module.exports = Wallet;