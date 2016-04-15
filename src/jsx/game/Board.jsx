import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Cell from 'game/Cell.jsx';

const styles = {
    main: {
        height: '70vh',
        width: '100%',
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
    marker: {
        width: '5vh',
        height: '5vh',
        fontSize: '3vh',
        color: 'white',
        fontWeight: 'bolder',
        margin: '10px',
        textAlign: 'center',
        opacity: '0.2'
    }
};

class Board extends React.Component {
    render() {
        let headerRow = [(<td key={'header_blank'}/>)];
        for (let i = 0; i < 8; i++)
            headerRow.push(<td style={styles.marker} key={'header_'+i}>{i}</td>);

        let tbody = this.props.board.map((row, i) => (
            <tr key={`row_${i}`}>
                <td key={`marker_${i}`} style={styles.marker}>{i}</td>
                {row.map((cell, j) => {
                    let highlight = this.props.position &&
                        this.props.position[0] == i &&
                        this.props.position[1] == j;
                    return (
                        <td key={`td_${8*i+j}`} style={styles.td}>
                            <Cell key={`cell_${8*i+j}`} highlight={highlight} val={cell} />
                        </td>
                    );
                })}
            </tr>
        ));
        return (
            <div style={styles.main}>
                <table>
                    <thead>
                        <tr>{headerRow}</tr>
                    </thead>
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}

let emptyBoard = [];
for (let i = 0; i < 8; i++) {
    emptyBoard.push(_.fill(Array(8), 0));
}

export default connect (
    function stateToProps(state) {
        if (state.initialized && state.data[state.currentFrame]) {
            let { board, position } = state.data[state.currentFrame];
            return { board, position };
        } else
            return {
                board: emptyBoard,
                positon: [0, 0]
            };
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(Board);
