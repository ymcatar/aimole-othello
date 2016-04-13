import * as actions from './actions';
import _ from 'lodash';

let initialState = {
    initialized: false,
    currentFrame: 0,
    totalFrame: 0,
    playing: false,
    player: ['Player 1', 'Player 2'],
    data: []
};

export default function reducer(prevState, action) {
    let state = _.clone(prevState) || initialState;

    switch(action.type) {

        case actions.RECEIVE_DATA: {
            state.initialized = true;
            state.data = action.data;
            state.totalFrame = action.data.length;

            // let [playerOne, playerTwo] = action.data[0].players;
            // state.playerName = [playerOne.name, playerTwo.name];

            state.playerName = ['Player 1', 'Player 2'];

            return state;
        }

        case actions.RECEIVE_FRAME: {
            state.data.push(action.data);
            return state;
        }

        case actions.SET_CURRENT_FRAME: {
            let val = action.data;
            /* current frame logic */
            if (action.data < 0)
                val = 0;
            else if (action.data > state.totalFrame - 1) {
                state.playing = false;
                val = state.totalFrame - 1;
            }
            state.currentFrame = val;
            return state;
        }

        case actions.SET_PLAY:
            state.playing = action.data;
            return state;
    }
    return state;
}
