import React from 'react';
import {Motion, spring} from 'react-motion';
import {Paper} from 'material-ui';

import Styles from 'Styles.jsx';

export default class Cell extends React.Component {
    getCellStyle(x) {
        return {
            fontSize: '10vh',
            fontWeight: 'bold',
            width: '20vh',
            height: '20vh',
            border: '5px solid ' + Styles.cell.borderColor,
            color: Styles.cell.textColor,
            backgroundColor: Styles.cell.bgColor,
            textAlign: 'center',
            verticalAlign: 'middle',
            boxShadow: Styles.zDepth._2,
            transform: `scale(${x})`
        };
    }

    getSymbol() {
        switch(this.props.val) {
            case 1:
                return 'O';
            case 2:
                return 'X';
            default:
                return ' ';
        }
    }

    render() {
        return (
            <Motion style={{x: spring(this.props.val === 0 ? 0.1 : 1, [390, 50])}}>
                {({x}) =>
                    <td style={this.getCellStyle(x)}>
                        {this.getSymbol()}
                    </td>
                }
            </Motion>

        );
    }
}
