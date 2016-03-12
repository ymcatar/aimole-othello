import React from 'react';
import _ from 'lodash';
import { Dialog } from 'material-ui';

import Cell from 'game/Cell.jsx';

const styles = {
    main: {
        height: '70vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    td: {
        margin: '10px'
    },
    text: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'lighter',
        fontSize: '3vh'
    },
    error: {
        textAlign: 'center',
        fontWeight: 'lighter'
    }
};

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        _.bindAll(this, ['hideError']);
    }

    hideError() {
        this.setState({
            error: false,
            message: null
        });
    }

    componentWillReceiveProps(nextProps) {
        let message = nextProps.message
            .filter(item => item !== 'ok')
            .map(item => {
                let [first, second] = item.split(' ');
                switch (first) {
                    case 'winner':
                        if (second == '1')
                            return `Black wins.`;
                        else if (second == '2')
                            return `White wins.`;
                        break;

                    case 'draw':
                        return `Draw!`;

                    case 'invalid':
                        if (second == '1')
                            return `Black performs an invalid move.`;
                        else if (second == '2')
                            return `White performs an invalid move.`;
                        break;

                    case 'terminated':
                        return 'Program terminated unexpectedly.';
                }
            });

        if (message.length !== 0)
            this.setState({
                error: true,
                message: message.join(' ')
            });
        else
            this.setState({
                error: false,
                message: null
            });
    }

    render() {
        let tbody = this.props.board.map((row, i) => (
            <tr key={`row${i}`}>
                {row.map((cell, j) => {
                    let highlight = this.props.position &&
                        this.props.position[0] == i &&
                        this.props.position[1] == j;
                    return (
                        <td style={styles.td}>
                            <Cell
                                key={`cell${i}${j}`}
                                highlight={highlight}
                                val={cell} />
                        </td>
                    );
                })}
            </tr>
        ));
        return (
            <div style={styles.main}>
                <table>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
                <Dialog
                    modal={false}
                    open={this.state.error}
                    onRequestClose={this.hideError}>
                    <h1 style={styles.error}>
                        {this.state.message}
                    </h1>
                </Dialog>
            </div>
        );
    }
}
