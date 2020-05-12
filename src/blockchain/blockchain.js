const Block = require('./block');
const Transaction = require('./transaction');

const MINING_DIFFICULTY_RATIO = 4;

class Blockchain {
    constructor() {
        this.chain = [new Block(0, [new Transaction('0x42', '0x84', 1)])];
        this.transactionQueue = [];
        this.reward = 1;

        console.log('A new blockchain has been created...');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    mineNewBlock(minerAddr) {
        let block = new Block(this.getLastBlock().signature, this.transactionQueue);

        console.log('Mining block...');

        block.signature = block.mine(MINING_DIFFICULTY_RATIO);
        this.chain.push(block);

        this.transactionQueue = [new Transaction(null, minerAddr, this.reward)];
    }

    pushTransaction(from, to, amount) {
        this.transactionQueue.push(new Transaction(from, to, amount));
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

    getAddrBalance(addr) {
        let balance = 0;

        this.chain.map((block) => {
            block.data.map((transaction) => {
                if (transaction.from === addr)
                    balance = balance - transaction.amount;
                if (transaction.to === addr)
                    balance = balance + transaction.amount;
            })
        });
        return balance;
    }
}

module.exports = Blockchain;