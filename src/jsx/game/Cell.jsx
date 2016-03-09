import React from 'react';
import {Motion, spring} from 'react-motion';

const getCellStyle = (x, y, val, flip) => {
    var style = {
        width: '6vh',
        height: '6vh',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        borderRadius: '50%',
        transform: `rotateZ(45deg) scale(${x}) rotateX(${flip? y: 0}deg)`
    };

    switch(val) {
        case 1:
            style.backgroundColor = '#222';
            break;
        case 2:
            style.backgroundColor = 'white';
            break;
        default:
            style.backgroundColor = '#eee';
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
        let flip = (prev == 1 && curr == 2) || (prev == 2 && curr == 1);
        return (
            <Motion
                defaultStyle={{x: 0.1, y: 0}}
                style={{
                    x: spring(this.props.val === 0? 0.1: 0.9, {stiffness: 100, damping: 8}),
                    y: spring(this.props.val === 1? 360: 0, {stiffness: 200, damping: 30})
                }}>
                {({x, y}) => <td style={getCellStyle(x, y, this.props.val, flip)}/>}
            </Motion>
        );
    }
}
