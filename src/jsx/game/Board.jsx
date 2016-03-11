import React from 'react';
import Cell from 'game/Cell.jsx';

const styles = {
    main: {
        height: '70vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    td: {
        margin: '10px'
    }
};

export default class Board extends React.Component {
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
            </div>
        );
    }
}
