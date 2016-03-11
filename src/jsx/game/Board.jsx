import React from 'react';
import Cell from 'game/Cell.jsx';

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

export default class Board extends React.Component {
    render() {
        let tbody = this.props.board.map((row, i) => (
            <tr key={`row${i}`}>
                {row.map((cell, j) => {
                    let highlight = this.props.position &&
                        this.props.position[0] == i &&
                        this.props.position[1] == j;
                    return (
                        <Cell
                            key={`cell${i}${j}`}
                            highlight={highlight}
                            val={cell} />
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
