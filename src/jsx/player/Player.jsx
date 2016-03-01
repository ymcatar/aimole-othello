import React from 'react';
import {Paper, FloatingActionButton, FontIcon, IconButton, Slider} from 'material-ui';
import _ from 'lodash';

const styles = {
    player: {
        height: '60px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sliderContainer: {
        marginLeft: '15px',
        width: '200px',
        height: '18px'
    },
    slider: {
        margin: '0px'
    },
    label: {
        marginLeft: '20px',
        width: '15px',
        fontWeight: 'bold',
        color: 'grey'
    }
};

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        _.bindAll(this, [
            'handlePrev',
            'handleNext',
            'handlePlay',
            'handleSliderChange'
        ]);
    }

    handlePrev() {
        this.props.setCurrentFrame.call(this, this.props.currentFrame - 1);
        this.props.setPlay.call(this, false);
    }

    handleNext() {
        this.props.setCurrentFrame.call(this, this.props.currentFrame + 1);
        this.props.setPlay.call(this, false);
    }

    handlePlay() {
        this.props.setPlay.call(this, !this.props.playing);
    }

    handleSliderChange(e, val) {
        this.props.setCurrentFrame.call(this, Math.floor(val * this.props.totalFrame));
        this.props.setPlay.call(this, false);
    }

    componentDidUpdate() {
        if (this.props.playing && this.props.currentFrame < this.props.totalFrame)
            setTimeout(() => {
                if (this.props.playing)
                    this.props.setCurrentFrame.call(this, this.props.currentFrame + 1);
            }, 1000);
    }

    render() {
        return (
            <Paper style={styles.player}>
                <IconButton
                    disabled={!this.props.submitted}
                    onTouchTap={this.handlePrev}
                    iconClassName="material-icons">
                    fast_rewind
                </IconButton>

                <FloatingActionButton
                    disabled={!this.props.submitted}
                    onTouchTap={this.handlePlay}
                    mini={true}
                    primary={true}>
                    <FontIcon className="material-icons">
                        {this.props.playing? 'pause' : 'play_arrow'}
                    </FontIcon>
                </FloatingActionButton>

                <IconButton
                    disabled={!this.props.submitted}
                    onTouchTap={this.handleNext}
                    iconClassName="material-icons">
                    fast_forward
                </IconButton>

                <div style={styles.sliderContainer}>
                    <Slider
                        disabled={!this.props.submitted}
                        onChange={this.handleSliderChange}
                        value={this.props.currentFrame/(this.props.totalFrame-1)}
                        step={1/(this.props.totalFrame-1)}
                        style={styles.slider} />
                </div>

                <p style={styles.label}>
                    {this.props.submitted? `${this.props.currentFrame + 1}/${this.props.totalFrame}`: '-/-'}
                </p>
            </Paper>
        );
    }
}
