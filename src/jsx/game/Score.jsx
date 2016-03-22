import React from 'react';
import { CircularProgress } from 'material-ui';

const styles = {
    main: {
        borderTop: '3px solid rgba(255, 255, 255, 0.5)',
        width: '80vw',
        display: 'flex',
        justifyContent: 'center',
    },
    separator: {
        borderLeft: '3px solid rgba(255, 255, 255, 0.5)',
        margin: '20px'
    },
    score: {
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        margin: '0 20px 0 20px'
    },
};

const getInnerProgress = val => ({
    backgroundColor: val == 1? 'white': 'black',
    borderRadius: '50%',
});

const getDigitStyle = val => ({
    fontSize: '8vh',
    color: val == 1? 'white': 'black',
    fontWeight: 'lighter',
    width: '50vw',
    textAlign: val == 1? 'right': 'left'
});

export default class Score extends React.Component {
    render() {
        let [black, white] = this.props.score;
        return (
            <div style={styles.main}>
                <div style={styles.score}>
                    <div style={getDigitStyle(1)}>{black}</div>
                    <CircularProgress
                        innerStyle={getInnerProgress(1)}
                        style={styles.progress}
                        mode="determinate"
                        value={black/64 * 100}
                        size={1.1}
                        color="white"/>
                </div>
                <div style={styles.separator} />
                <div style={styles.score}>
                    <CircularProgress
                        innerStyle={getInnerProgress(2)}
                        style={styles.progress}
                        mode="determinate"
                        value={white/64 * 100}
                        size={1.1}
                        color="black"/>
                    <div style={getDigitStyle(2)}>{white}</div>
                </div>
            </div>
        );
    }
}
