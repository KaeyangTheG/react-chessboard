export const PATTERN = [
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w',
    'w','b','w','b','w','b','w','b',
    'b','w','b','w','b','w','b','w'
];

export const SQUARES = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
];

export function getFileDistance (from, to) {
    const files = 'abcdefgh'.split('');
    return Math.abs(files.indexOf(from.charAt(0)) - files.indexOf(to.charAt(0)));
}

export function getRankDistance (from, to) {
    return Math.abs(from.charAt(1) - to.charAt(1));
}

export function getSquareDistance (from, to) {
  return Math.max(getFileDistance(from, to),
      getRankDistance(from, to));
}
