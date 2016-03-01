import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from 'game/Main.jsx';
import Player from 'player/Player.jsx';

injectTapEventPlugin();

const styles = {
    main: {
        width: '100vw'
    },
    game: {
        width: '100vw',
        height: '10vh',
        background: 'url(http://www.freebiesgallery.com/wp-content/uploads/2014/02/blurred-background-2.jpg)'
    },
    player: {
        width: '100vw'
    }
};

let gameBoard = [
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[1, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[1, 2, 0], [0, 0, 0], [0, 0, 0]],
    [[1, 2, 0], [0, 1, 0], [0, 0, 0]],
    [[1, 2, 0], [0, 1, 0], [0, 0, 2]],
    [[1, 2, 0], [0, 1, 0], [1, 0, 2]],
    [[1, 2, 0], [2, 1, 0], [1, 0, 2]],
    [[1, 2, 0], [2, 1, 0], [1, 1, 2]],
    [[1, 2, 0], [2, 1, 2], [1, 1, 2]],
    [[1, 2, 1], [2, 1, 2], [1, 1, 2]],
];

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            results: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
            submitted: false,
            currentFrame: 0,
            totalFrame: 0,
            playing: false
        };
        this.setCurrentFrame = this.setCurrentFrame.bind(this);
        this.setPlay = this.setPlay.bind(this);
    }

    componentDidMount() {
        //alert('submit button clicked.');
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

ReactDOM.render(<App />, document.getElementById('main'));
