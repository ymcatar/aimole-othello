import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from 'game/Main.jsx';
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
        let gameBoard = [
            [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ]
        ];
        this.state = {
            results: gameBoard,
            submitted: false,
            currentFrame: 0,
            totalFrame: 0,
            playing: false
        };
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.setPlay = this.setPlay.bind(this);
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
                <Main result={this.state.results[this.state.currentFrame]} />
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
