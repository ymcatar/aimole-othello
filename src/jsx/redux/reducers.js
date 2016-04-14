import * as actions from './actions';
import _ from 'lodash';

let initialState = {
    initialized: false,
    currentFrame: 0,
    totalFrame: 0,
    playing: false,
    playerName: ['Player 1', 'Player 2'],
    data: [],
    ended: false
};

export default function reducer(prevState, action) {
    let state = _.clone(prevState) || initialState;

    switch(action.type) {

        case actions.RECEIVE_DATA: {

            if (!action.data || action.data.length <= 0)
                return state;

            let playerOne, playerTwo;

            if (action.data && action.data[0] && action.data[0].players)
                [playerOne, playerTwo] = action.data[0].players;

            if (playerOne && playerTwo)
                state.playerName = [playerOne.name, playerTwo.name];
            else
                state.playerName = ['Player 1', 'Player 2'];

            action.data.shift();

            state.initialized = true;
            state.data = action.data;
            state.totalFrame = action.data.length;

            state.ended = true;
            return state;
        }

        case actions.RECEIVE_FRAME: {
            let playerOne, playerTwo;
            if (action.data && action.data.players) {
                [playerOne, playerTwo] = action.data.players;
                state.playerName = [playerOne.name, playerTwo.name];
                return state;
            }

            state.initialized = true;
            state.data.push(action.data);
            state.totalFrame = state.data.length;
            return state;
        }

        case actions.END_STREAM: {
            state.ended = true;
            return state;
        }

        case actions.SET_CURRENT_FRAME: {
            let val = action.data;
            /* current frame logic */
            if (action.data < 0)
                val = 0;
            else if (state.ended && action.data > state.totalFrame - 1) {
                state.playing = false;
                val = state.totalFrame - 1;
            } else if (!state.ended && action.data > state.totalFrame - 1) {
                console.log('too fast!');
                val = state.currentFrame;
            }

            state.currentFrame = val;
            return state;
        }

        case actions.SET_PLAY: {
            state.playing = action.data;
            return state;
        }
    }
    return state;
}
