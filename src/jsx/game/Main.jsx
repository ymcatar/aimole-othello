import React from 'react';
import MediaQuery from 'react-responsive';

import Score from 'game/Score.jsx';
import Board from 'game/Board.jsx';

const styles = {
    main: {
        height: 'calc(100vh - 60px)',
        width: '100vw',
        background: 'linear-gradient(#1EBCD0, #4285F4)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default class Main extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                <Board {... this.props}/>
                <MediaQuery minHeight={500}>
                    <Score score={this.props.score}/>
                </MediaQuery>
            </div>
        );
    }
}
