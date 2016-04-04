import React from 'react';
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

export default class Stdout extends React.Component {
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
