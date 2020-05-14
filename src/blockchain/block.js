const sha256 = require('crypto-js/sha256');

class Block {
    constructor(previousBlock, data) {
        this.nonce = 0;
        this.timeStamp = new Date();
        this.data = data;
        this.previousBlock = previousBlock;
        this.signature = this.createSignature();
    }

    createSignature() {
        return sha256(this.previousBlock + this.timeStamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mine(difficulty) {
        while (this.signature.substring(0, difficulty) !== Array(difficulty + 1).join('7')) {
            this.nonce++;
            this.signature = this.createSignature();
        }
        console.log('Block mined: ' + this.signature);
        return (this.signature);
    }

    checkTransaction() {
        this.data.map((transaction) => {
            if (!transaction.isValid())
                return false
        });
        return true;
    }
}

module.exports = Block;