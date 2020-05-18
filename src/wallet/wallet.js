const Transaction = require('../blockchain/transaction');
const LoufiCoin = require('../blockchain/blockchain');
const Keygen = require('../utils/keygen');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const ERROR_INSUFFICENT_FUNDS = '\x1b[32m[WALLET]\x1b[0m\t\x1b[31mERROR: You have insufficient founds to perfom this transaction.\x1b[0m';

class Wallet {
    constructor(privateKey, publicKey) {
        if (!privateKey) {
            const keygen = new Keygen();
            this.privateKey = keygen.getPrivateKey();
            this.publicKey = keygen.getPublicKey();
        } else {
            this.privateKey = privateKey;
            this.publicKey = publicKey;
        }
    }

    sendCoinTo(to, amount) {
        let error = '';
        const sold = LoufiCoin.getAddrBalance(this.publicKey);
        if (sold < amount) {
            console.log(ERROR_INSUFFICENT_FUNDS);
            return 'You have insufficient funds to perform this transaction.';
        }
        const t = new Transaction(this.publicKey, to, amount);

        error = t.signTransaction(ec.keyFromPrivate(this.privateKey));
        if (error) return error;
        error = LoufiCoin.pushTransaction(t);
        if (error) return error;
        return 'Transaction done';
    }

    getBalance() {
        return LoufiCoin.getAddrBalance(this.publicKey);
    }
}

module.exports = Wallet;