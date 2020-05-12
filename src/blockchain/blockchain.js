const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [new Block(0, 0, 'A mysterious sentence...')];

        console.log('A new blockchain has been created...');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(block) {
        block.previousBlock = this.getLastBlock().signature;
        block.signature = block.createSignature();
        this.chain.push(block);
    }

    length() {
        return this.chain.length;
    }

    checkValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            console.log(this.chain[i].signature);
            console.log(this.chain[i].createSignature());
            console.log('\n');
            if (this.chain[i].signature !== this.chain[i].createSignature())
                return false;
            if (this.chain[i].previousBlock !== this.chain[i - 1].signature)
                return false;
        }
        return true;
    }
}

module.exports = Blockchain;