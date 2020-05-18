const Block = require('./block');
const Transaction = require('./transaction');

const sha256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const MINING_DIFFICULTY_RATIO = 5;
const BLOCKCHAIN_CREATED = '\x1b[34m[BLOCKCHAIN]\x1b[0m\tINFO: A new blockchain has been created...\x1b[0m';
const MINING_BLOCK = '\x1b[34m[BLOCKCHAIN]\x1b[0m\tINFO: Mining block...\x1b[0m';

class Blockchain {
    constructor() {
        this.chain = [new Block(0, [new Transaction('0x42', '0x84', 1)])];
        this.transactionQueue = [];
        this.reward = 1;

        console.log(BLOCKCHAIN_CREATED);
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    mineNewBlock(minerAddr) {
        let block = new Block(this.getLastBlock().signature, this.transactionQueue);

        console.log(MINING_BLOCK);

        block.signature = block.mine(MINING_DIFFICULTY_RATIO);
        this.chain.push(block);

        if (!this.checkValidity()) {
            this.chain.pop();
            return false;
        }

        this.transactionQueue = [new Transaction(null, minerAddr, this.reward)];
    }

    pushTransaction(transaction) {
        if (!transaction.from || !transaction.to)
            return 'Transaction must have from and to address';
        if (!this.verifyTransaction(transaction))
            return 'Transaction must be valid';
        console.log('transaction effectué');
        this.transactionQueue.push(transaction);
        return 0;
    }

    length() {
        return this.chain.length;
    }

    checkValidity() {
        for (let i = 1; i < this.chain.length; i++) {
            if (!this.chain[i].checkTransaction())
                return false;
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

    getAddrTransactions(addr) {
        const t = [];

        this.chain.map((block) => {
            block.data.map((transaction) => {
                if (transaction.from === addr || transaction.to === addr)
                    t.push(transaction);
            })
        });
        return t;
    }

    verifyTransaction(t) {
        console.log(t);

        if (t.from === null)
            return true;

        if (!t.signature || t.signature.length === 0)
            throw new Error('Transaction must be signed');

        const publicKey = ec.keyFromPublic(t.from, 'hex');
        return publicKey.verify(this.createTransactionHash(t), t.signature);
    }

    createTransactionHash(t) {
        return sha256(t.from + t.to + t.amount + t.timeStamp).toString();
    }
}

let LoufiCoin = new Blockchain();

module.exports = LoufiCoin;