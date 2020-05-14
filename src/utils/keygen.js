const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Keygen {
    constructor() {
        this.key = ec.genKeyPair();
    }

    getPrivateKey() {
        return this.key.getPrivate('hex');
    }

    getPublicKey() {
        return this.key.getPublic('hex');
    }
}

module.exports = Keygen;