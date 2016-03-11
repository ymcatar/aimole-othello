import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';

import Board from 'game/Board.jsx';
import Player from 'player/Player.jsx';

import data from './data';

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
    constructor(props) {
        super(props);

        let board = [[]];
        for (let i = 0; i < 8; i++)
             board[0].push(_.fill(Array(8), 0));

        this.state = {
            board: board,
            submitted: false,
            currentFrame: 0,
            totalFrame: 0,
            playing: false
        };
        _.bindAll(this, ['setCurrentFrame', 'setPlay']);
    }

    componentDidMount() {
        let gameBoard = data.map(i => i.board);
        this.setState({
            results: gameBoard,
            submitted: true,
            currentFrame: 0,
            totalFrame: gameBoard.length,
            playing: true
        });
    }

    setCurrentFrame(newVal) {
        if (newVal < 0)
            newVal = 0;
        else if (newVal > this.state.totalFrame - 1)
            newVal = this.state.totalFrame - 1;
        this.setState({ currentFrame: newVal });
    }

    setPlay(newVal) {
        this.setState({playing: newVal});
    }

    render() {
        return (
            <div style={styles.main}>

                <Board
                    board={this.state.board[this.state.currentFrame]} />

                <Player
                    playing={this.state.playing}
                    setPlay={this.setPlay}
                    setCurrentFrame={this.setCurrentFrame}
                    currentFrame={this.state.currentFrame}
                    totalFrame={this.state.totalFrame}
                    submitted={this.state.submitted}
                    style={styles.player} />
            </div>
        );
    }
}

render(<App />, document.getElementById('main'));
