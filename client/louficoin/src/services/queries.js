import axios from 'axios';

const queriesManager = {
    async getBlockchain(callback) {
        return axios.get(`http://localhost:4200/getBlockchain`).then(res => {
            return callback(res);
        })
    },

    async getWalletSold(callback) {
        return axios.get(`http://localhost:4200/getWalletSold`).then(res => {
            return callback(res);
        })
    },

    async connectToWallet(isNewWallet, privateKey, publicKey, callback) {
        return axios.post(`http://localhost:4200/createWallet`,
            {
                isNewWallet: isNewWallet,
                privateKey: privateKey,
                publicKey: publicKey,
            }).then(res => {
            return callback(res);
        })
    },

    async sendCoinsTo(amount, publicKey, callback) {
        return axios.post(`http://localhost:4200/sendCoinsTo`,
            {
                toPublicKey: publicKey,
                amount: amount,
            }).then(res => {
            return callback(res);
        })
    },

    async walletTransactions(publicKey, callback) {
        return axios.get(`http://localhost:4200/walletTransactions?publicKey=` + publicKey).then(res => {
            return callback(res);
        })
    },

    async mineNewBlock(publicKey, callback) {
        return axios.get(`http://localhost:4200/mineNewBlock?publicKey=` + publicKey).then(res => {
            return callback(res);
        })
    },
};

export default queriesManager;