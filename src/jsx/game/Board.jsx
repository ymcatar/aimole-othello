import React from 'react';
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

export default class Board extends React.Component {
    render() {
        let headerRow = [(<td />)];
        for (let i = 0; i < 8; i++)
            headerRow.push(<td style={styles.marker}>{i}</td>);

        let tbody = this.props.board.map((row, i) => (
            <tr key={`row${i}`}>
                <td style={styles.marker}>{i}</td>
                {row.map((cell, j) => {
                    let highlight = this.props.position &&
                        this.props.position[0] == i &&
                        this.props.position[1] == j;
                    return (
                        <td key={`cell${i}${j}`} style={styles.td}>
                            <Cell highlight={highlight} val={cell} />
                        </td>
                    );
                })}
            </tr>
        ));
        return (
            <div style={styles.main}>
                <table>
                    <tr>
                        {headerRow}
                    </tr>
                    <tbody>{tbody}</tbody>
                </table>
            </div>
        );
    }
}
