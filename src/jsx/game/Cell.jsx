import React from 'react';
import {Motion, spring} from 'react-motion';
import {Paper} from 'material-ui';

import Styles from 'Styles.jsx';

const getCellStyle = (x, y, val, flip) => {
    var style = {
        width: '5vh',
        height: '5vh',
        color: Styles.cell.textColor,
        boxShadow: Styles.zDepth._2,
        borderRadius: '50%',
    };

    style.transform = flip?
        `scale(0.9) rotateX(${y}deg)`:
        `scale(${x})`;

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
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ prevVal: this.props.val });
    }

    render() {
        let prev = this.state.prevVal, curr = this.props.val;
        //console.log(prev, curr);
        let flip = (prev !== 0 && curr !== 0) && (prev !== curr);
        return (
            <Motion style={{
                x: spring(this.props.val === 0? 0.1: 0.9, {stiffness: 100, damping: 9}),
                y: spring(flip? 0: 360, {stiffness: 100, damping: 9})
            }}>
                {({x, y}) => <td style={getCellStyle(x, y, this.props.val, flip)}/>}
            </Motion>
        );
    }
}
