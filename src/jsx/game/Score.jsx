import React from 'react';

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
    }
};

const getCellStyle = val => ({
    width: '5vh',
    height: '5vh',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.15)',
    borderRadius: '50%',
    background: val == 1? 'black': 'white',
    margin: '0 20px 0 20px'
});

const getDigitStyle = val => ({
    fontSize: '10vh',
    color: val == 1? 'black': 'white',
    fontWeight: 'lighter',
    width: '50vw',
    textAlign: val == 1? 'right': 'left',
    textShadow: '0 3px 6px rgba(0,0,0,0.16)'
});

export default class Score extends React.Component {
    render() {
        let [black, white] = this.props.score;
        return (
            <div style={styles.main}>
                <div style={styles.score}>
                    <div style={getDigitStyle(1)}>{black}</div>
                    <div style={getCellStyle(1)} />
                </div>
                <div style={styles.separator} />
                <div style={styles.score}>
                    <div style={getCellStyle(2)} />
                    <div style={getDigitStyle(2)}>{white}</div>
                </div>
            </div>
        );
    }
}
