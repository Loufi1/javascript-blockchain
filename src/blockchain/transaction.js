const sha256 = require('crypto-js/sha256');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timeStamp = new Date();
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
}

module.exports = Transaction;