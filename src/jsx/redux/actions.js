export const RECEIVE_DATA = 'actions: receive data';
const receiveData = data => ({ type: RECEIVE_DATA, data });

export const fetchData = () => {
    let data = window.aimole.display && window.aimole.display.length > 0 ? window.aimole.display: [];
    return function(dispatch) {
        dispatch(receiveData(data));
    };
};

export const SET_CURRENT_FRAME = 'actions: set current frame';
export const setCurrentFrame = data => ({ type: SET_CURRENT_FRAME, data });

export const SET_PLAY = 'actions: set play';
export const setPlay = data => ({ type: SET_PLAY, data });
