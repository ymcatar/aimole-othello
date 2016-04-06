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
    }
};

class Stdout extends React.Component {
    render() {
        let { stdout } = this.props;
        return (
            <div style={styles.main}>
                <h5>OUTPUT</h5>
                <div style={styles.output}>
                    {stdout? stdout: '-'}
                </div>
            </div>
        );
    }
}

export default connect(
    function stateToProps(state) {
        if (state.initialized)
            return {
                stdout: state.data[state.currentFrame].stdout
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
