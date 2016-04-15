import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

const styles = {
    main: {
        color: 'white',
        width: '30vw',
        padding: '10px'
    },
    output: {
        height: '200px',
        color: 'white',
        wordBreak: 'break-all',
        overflowX: 'hidden',
        overflowY: 'scroll',
    },
    grey: color => ({
        opacity: 0.2,
        color: color? 'white': 'black',
        fontWeight: 'bolder'
    }),
    normal: color => ({
        color: !color? 'white': 'black',
        fontWeight: 'bolder'
    })
};

class Stdout extends React.Component {
    render() {
        let { stdout, isWhite } = this.props;
        return (
            <div style={styles.main}>
                <h5>OUTPUT</h5>
                <div style={styles.output}>
                    <div style={styles.grey(isWhite)}>
                        {stdout[0]? stdout[0]: '-'}
                    </div>
                    <div style={styles.normal(isWhite)}>
                        {stdout[1]? stdout[1]: '-'}
                    </div>
                    <div style={styles.grey(isWhite)}>
                        {stdout[2]? stdout[2]: '-'}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        if (state.initialized && state.data[state.currentFrame])
            return {
                stdout: [
                    state.currentFrame - 1 >= 0? state.data[state.currentFrame-1].stdout: null,
                    state.data[state.currentFrame].stdout,
                    state.currentFrame + 1 < state.totalFrame? state.data[state.currentFrame+1].stdout: null,
                ],
                isWhite: state.data[state.currentFrame].player === 1
            };
        else
            return {
                stdout: ''
            };
    },
    function dispatchToProps(dispatch) {
        return {};
    }
)(Stdout);
