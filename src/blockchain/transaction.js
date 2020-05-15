const sha256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timeStamp = new Date().toString();
        this.signature = null;
    }

    createHash() {
        return sha256(this.from + this.to + this.amount + this.timeStamp).toString();
    }

    signTransaction(key) {
        if(key.getPublic('hex') !== this.from)
            throw new Error('Cannot sign transaction for other wallets');

        const hash = this.createHash();
        const signature = key.sign(hash, 'base64');

        this.signature = signature.toDER('hex');
    }

    isValid() {
        if (this.from === null)
            return true;

        if (!this.signature || this.signature.length === 0)
            throw new Error('Transaction must be signed');

        const publicKey = ec.keyFromPublic(this.from, 'hex');
        return publicKey.verify(this.createHash(), this.signature);
    }
}

module.exports = Transaction;