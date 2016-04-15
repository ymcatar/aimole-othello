let { aimole, display } = require('../../aimole');

export const RECEIVE_DATA = 'actions: receive data';
const receiveData = data => ({ type: RECEIVE_DATA, data });

export const fetchData = () => {
    let data = display && display.length > 0 ? display: [];
    return function(dispatch) {
        dispatch(receiveData(data));
    };
};

export const RECEIVE_FRAME = 'actions: receive frame';
const receiveFrame = data => ({ type: RECEIVE_FRAME, data });

export const END_STREAM = 'actions: end streaming';
const endStream = () => ({ type: END_STREAM });

export const startStream = () => {
    return function(dispatch) {
        // console.log(aimole);
        aimole.on('display', e => {
            dispatch(receiveFrame(e));
        });
        aimole.on('end', e => {
            dispatch(endStream());
        });
    };
};

export const SET_CURRENT_FRAME = 'actions: set current frame';
export const setCurrentFrame = data => ({ type: SET_CURRENT_FRAME, data });

export const SET_PLAY = 'actions: set play';
export const setPlay = data => ({ type: SET_PLAY, data });
