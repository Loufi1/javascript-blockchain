const crypto = require('crypto');
const Swarm = require('discovery-swarm');
const defaults = require('dat-swarm-defaults');
const getPort = require('get-port');

const peers = {};
let connSeq = 0;

const myId = crypto.randomBytes(32);
console.log('Your identity: ' + myId.toString('hex'));

const sendToPeers = (data) => {
    for (let id in peers) {
        peers[id].conn.write(JSON.stringify({
            data: data,
        }).toString());
    }
};

const startServer = async () => {
    const config = defaults({
        id: myId,
    });

    const sw = Swarm(config);

    (async () => {
        const port = await getPort();

        sw.listen(port);
        console.log('Listening to port: ' + port);

        sw.join('loufiCoin');

        sw.on('connection', (conn, info) => {
            const seq = connSeq;

            const peerId = info.id.toString('hex');
            console.log(`Connected #${seq} to peer: ${peerId}`);

            if (info.initiator) {
                try {
                    conn.setKeepAlive(true, 600)
                } catch (exception) {
                    console.log('exception', exception)
                }
            }

            conn.on('data', data => {
                console.log(
                    'Received Message from peer ' + peerId,
                    '----> ' + JSON.parse(data).data
                )
            });

            conn.on('close', () => {
                console.log(`Connection ${seq} closed, peer id: ${peerId}`);
                if (peers[peerId].seq === seq) {
                    delete peers[peerId];
                }
            });

            if (!peers[peerId]) {
                peers[peerId] = {};
            }
            peers[peerId].conn = conn;
            peers[peerId].seq = seq;
            connSeq++;
        });
    })();
};

module.exports.sendToPeers = sendToPeers;
module.exports.startServer = startServer;