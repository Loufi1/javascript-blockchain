const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, previousBlock, data) {
        this.timeStamp = new Date();
        this.index = index;
        this.data = data;

        this.previousBlock = previousBlock;
        this.signature = this.createSignature();
    }

    createSignature() {
        return sha256(this.previousBlock + this.timeStamp + this.index + JSON.stringify(this.data)).toString();
    }
}

module.exports = Block;