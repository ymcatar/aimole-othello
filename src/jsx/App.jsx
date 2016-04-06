import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';

import Main from 'game/Main.jsx';
import Player from 'player/Player.jsx';
import Message from 'message/Message.jsx';

import data from './data';

let gameData = window.aimole.display && window.aimole.display.length > 0 ? window.aimole.display : data;

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

let emptyBoard = [];
for (let i = 0; i < 8; i++) {
    emptyBoard.push(_.fill(Array(8), 0));
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: emptyBoard,
            submitted: false,
            currentFrame: 0,
            totalFrame: 0,
            playing: false
        };
        _.bindAll(this, ['setCurrentFrame', 'setPlay']);
    }

    componentDidMount() {
        this.setState({
            results: gameData,
            submitted: true,
            currentFrame: 0,
            totalFrame: gameData.length,
            playing: true
        });
    }

    setCurrentFrame(newVal) {
        if (newVal < 0)
            newVal = 0;
        else if (newVal > this.state.totalFrame - 1) {
            newVal = this.state.totalFrame - 1;
            this.setState({ playing: false, currentFrame: newVal });
            return;
        }
        this.setState({ currentFrame: newVal });
    }

    setPlay(newVal) {
        this.setState({playing: newVal});
    }

    render() {
        let result = {
            board: emptyBoard,
            score: [0,0],
            player: 0,
            stdout: '',
            position: false,
            playerName: [
                'Player 1',
                'Player 2'
            ]
        };

        if (this.state.results) {
            let [ playerA, playerB ] = this.state.results[0].players;
            result.playerName = [playerA, playerB];
            result = _.defaults(this.state.results[this.state.currentFrame], result);
        }

        let {board, score, player, stdout, position, message, playerName} = result;

        return (
            <div style={styles.main}>
                <Main
                    board={board}
                    score={score}
                    player={player}
                    stdout={stdout}
                    position={position}
                    playerName={playerName} />

                <Player
                    playing={this.state.playing}
                    setPlay={this.setPlay}
                    setCurrentFrame={this.setCurrentFrame}
                    currentFrame={this.state.currentFrame}
                    totalFrame={this.state.totalFrame}
                    submitted={this.state.submitted}
                    style={styles.player} />

                <Message message={message || []} />
            </div>
        );
    }
}

render(<App />, document.getElementById('main'));
