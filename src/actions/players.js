export const UPDATE_PLAYERS = 'UPDATE_PLAYERS';

export function updatePlayers (players) {
    return {
        type: UPDATE_PLAYERS,
        payload: players
    };
}
