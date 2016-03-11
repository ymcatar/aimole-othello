import React from 'react';
import {Paper, FloatingActionButton, FontIcon, IconButton, Slider, Dialog} from 'material-ui';
import _ from 'lodash';

import spec from 'spec.js';

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
    },
    specToggle: {
        margin: '0 0 0 20px'
    },
    specIcon: {
        color: 'grey'
    }
};

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        _.bindAll(this, [
            'handleSpecToggle',
            'handlePrev',
            'handleNext',
            'handlePlay',
            'handleSliderChange'
        ]);
    }

    handleSpecToggle(e) {
        this.props.setPlay(false);
        this.setState({
            open: !this.state.open,
            archor: e.currentTarget
        });
    }

    handlePrev() {
        this.props.setCurrentFrame(this.props.currentFrame - 1);
        this.props.setPlay(false);
    }

    handleNext() {
        this.props.setCurrentFrame(this.props.currentFrame + 1);
        this.props.setPlay(false);
    }

    handlePlay() {
        this.props.setPlay(!this.props.playing);
    }

    handleSliderChange(e, val) {
        this.props.setCurrentFrame(Math.floor(val * this.props.totalFrame));
        this.props.setPlay(false);
    }

    componentDidUpdate() {
        if (this.props.playing && this.props.currentFrame < this.props.totalFrame)
            setTimeout(() => {
                if (this.props.playing)
                    this.props.setCurrentFrame(this.props.currentFrame + 1);
            }, 1500);
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

                <IconButton
                    style={styles.specToggle}
                    iconStyle={styles.specIcon}
                    tooltip={<p>Show specifications</p>}
                    tooltipPosition="top-right"
                    onTouchTap={this.handleSpecToggle}
                    iconClassName="material-icons">
                    insert_comment
                </IconButton>

                <Dialog
                    title="Specification"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleSpecToggle}>
                    <div>
                        {spec.message.split('\n').map(item => (
                            <span>
                                {item}
                                <br />
                            </span>
                        ))}
                    </div>
                </Dialog>
            </Paper>
        );
    }
}
