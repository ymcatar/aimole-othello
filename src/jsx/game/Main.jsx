import React from 'react';
import Board from 'game/Board.jsx';

const styles = {
    main: {
        height: 'calc(100vh - 60px)',
        width: '100vw',
        background: 'linear-gradient(#E5FBD5, #0A6D88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default class Main extends React.Component {
    render() {
        return (
            <div style={styles.main}>
                <Board result={this.props.result} />
            </div>
        );
    }
}
