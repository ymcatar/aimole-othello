import React from 'react';

import Styles from 'Styles.jsx';
import Cell from 'game/Cell.jsx';

export default class Board extends React.Component {
    render() {
        var tbody = this.props.result.map((row, i) => (
            <tr key={`row${i}`}>
                {row.map((cell, j) => (
                    <Cell key={`cell${i}${j}`} val={cell} />
                ))}
            </tr>
        ));

        return (
            <table>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        );
    }
}
