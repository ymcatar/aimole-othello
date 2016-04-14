export const RECEIVE_DATA = 'actions: receive data';
const receiveData = data => ({ type: RECEIVE_DATA, data });

export const fetchData = () => {
    let data = window.aimole.display && window.aimole.display.length > 0 ? window.aimole.display: [];
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
        window.addEventListener('newframe', e => {
            dispatch(receiveFrame(e.detail));
        });
        window.addEventListener('end', e => {
            dispatch(endStream());
        });
    };
};

export const SET_CURRENT_FRAME = 'actions: set current frame';
export const setCurrentFrame = data => ({ type: SET_CURRENT_FRAME, data });

export const SET_PLAY = 'actions: set play';
export const setPlay = data => ({ type: SET_PLAY, data });
