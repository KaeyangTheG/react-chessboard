const enginePath = '../../node_modules/stockfish/src/stockfish.js';
const engine = new Worker(enginePath);

window.stockfish = engine;

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
    return new Promise((resolve) => {
        engine.onmessage = ({data}) => {
            if (data === 'uciok') {
                resolve(data);
            }
        };
        send('uci');
    });
}

function send (str) {
    engine.postMessage(str);
}
