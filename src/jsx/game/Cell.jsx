import React from 'react';
import {Motion, spring} from 'react-motion';
import {Paper} from 'material-ui';

import Styles from 'Styles.jsx';

const getCellStyle = (x, val) => {
    var style = {
        width: '5vh',
        height: '5vh',
        color: Styles.cell.textColor,
        boxShadow: Styles.zDepth._2,
        transform: `scale(${x})`,
        borderRadius: '50%'
    };
    switch(val) {
        case 1:
            style.backgroundColor = 'black';
            style.border = '3px solid #555';
            break;
        case 2:
            style.backgroundColor = 'white';
            style.border = '3px solid #eee';
            break;
        default:
            style.backgroundColor = Styles.cell.bgColor;
            style.border = '3px solid ' + Styles.cell.borderColor;
            break;
    }
    return style;
};

export default class Cell extends React.Component {
    render() {
        return (
            <Motion style={{
                x: spring(this.props.val === 0? 0.1: 0.9, [390, 50])
            }}>
                {({x}) => <td style={getCellStyle(x, this.props.val)}/>}
            </Motion>
        );
    }
}
