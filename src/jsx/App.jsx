import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';

import store from 'redux/store';

import Main from 'game/Main.jsx';
import Player from 'player/Player.jsx';
import Message from 'message/Message.jsx';

injectTapEventPlugin();

const styles = {
    main: {
        width: '100vw'
    },
    game: {
        width: '100vw',
        height: '10vh'
    },
    player: {
        width: '100vw'
    }
};

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div style={styles.main}>
                    <Main />
                    <Player />
                    <Message />
                </div>
            </Provider>
        );
    }
}

render(<App />, document.getElementById('main'));
