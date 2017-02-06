const enginePath = './lib/stockfish.js';
const engine = new Worker(enginePath);

let initialized = false;

export function getMove (fen) {
    return init()
        .then(() => {
            return new Promise((resolve) => {
                engine.onmessage = ({data}) => {
                    if (data.indexOf('bestmove') > -1) {
                        resolve(data.split(' ')[1]);
                    }
                };
                send(`position fen ${fen}`);
                send('go movetime 1000');
            });
        });
}

export function getScore (fen) {
    return init()
        .then(() => {
            return new Promise((resolve) => {
                engine.onmessage = ({data}) => {
                    if (data.indexOf('Evaluation') > -1) {
                        resolve(data.split(' ')[2]);
                    }
                };
                send(`position fen ${fen}`);
                send('eval');
            });
        });
}

function init () {
    return initialized
        ? Promise.resolve('uciok')
        : new Promise((resolve) => {
            engine.onmessage = ({data}) => {
                if (data === 'uciok') {
                    initialized = true;
                    resolve(data);
                }
            };
            send('uci');
        });
}

function send (str) {
    engine.postMessage(str);
}
