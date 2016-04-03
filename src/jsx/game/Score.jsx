import React from 'react';
import { CircularProgress } from 'material-ui';

const styles = {
    main: {
        width: '80vw',
        display: 'flex',
        justifyContent: 'center',
    },
    separator: {
        borderLeft: '2px solid #3367D6',
        margin: '20px'
    },
    score: {
        display: 'flex',
        alignItems: 'center'
    },
    progress: {
        margin: '0 30px 0 30px'
    },
    innerProgress: val => ({
        backgroundColor: val == 1? 'white': 'black',
        borderRadius: '50%',
    }),
    digit: val => ({
        fontSize: '7vh',
        color: val == 1? 'white': 'black',
        fontWeight: 'lighter',
        textAlign: val == 1? 'right': 'left',
        width: '40vw'
    }),
    name: val => ({
        textAlign: val == 1? 'right': 'left',
        color: val == 1? 'white': 'black',
        marginTop: '-1vh',
        marginLeft: val == 2? '5px': 0,
        marginRight: val == 1? '5px': 0,
        fontWeight: 'bolder'
    })
};

export default class Score extends React.Component {
    render() {
        let [black, white] = this.props.score;
        return (
            <div style={styles.main}>
                <div style={styles.score}>
                    <div>
                        <div style={styles.digit(1)}>{black}</div>
                        <div style={styles.name(1)}>{this.props.playerName[0]}</div>
                    </div>
                    <CircularProgress
                        innerStyle={styles.innerProgress(1)}
                        style={styles.progress}
                        mode="determinate"
                        value={black/64 * 100}
                        size={1.1}
                        color="white"/>
                </div>
                <div style={styles.separator} />
                <div style={styles.score}>
                    <CircularProgress
                        innerStyle={styles.innerProgress(2)}
                        style={styles.progress}
                        mode="determinate"
                        value={white/64 * 100}
                        size={1.1}
                        color="black"/>
                    <div>
                        <div style={styles.digit(2)}>{white}</div>
                        <div style={styles.name(2)}>{this.props.playerName[1]}</div>
                    </div>
                </div>
            </div>
        );
    }
}
