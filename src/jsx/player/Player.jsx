import React from 'react';
import {Paper, FloatingActionButton, FontIcon, IconButton, Slider, Dialog} from 'material-ui';
import _ from 'lodash';

import marked from 'marked';

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
        fontWeight: 'bolder',
        color: 'grey',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        OUserSelect: 'none',
        MozUserSelect: 'none'
    },
    specToggle: {
        margin: '0 0 0 20px'
    },
    specIcon: {
        color: 'grey'
    },
    spec: {
        fontFamily: 'sans-serif',
        overflow: 'scroll',
        height: '90vh',
        whiteSpace: 'normal',
        margin: '20px 0px 20px 0px',
    }
};

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
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
        let { playing, currentFrame, totalFrame, submitted } = this.props;
        let begin = (currentFrame === 0);
        let end = (currentFrame >= totalFrame - 1);

        return (
            <Paper style={styles.player}>
                <IconButton
                    disabled={!submitted || begin}
                    onTouchTap={this.handlePrev}
                    iconClassName="material-icons">
                    fast_rewind
                </IconButton>

                <FloatingActionButton
                    mini={true}
                    primary={true}
                    disabled={!submitted || end}
                    onTouchTap={this.handlePlay} >
                    <FontIcon className="material-icons">
                        {playing? 'pause': 'play_arrow'}
                    </FontIcon>
                </FloatingActionButton>

                <IconButton
                    disabled={!submitted || end}
                    onTouchTap={this.handleNext}
                    iconClassName="material-icons">
                    fast_forward
                </IconButton>

                <div style={styles.sliderContainer}>
                    <Slider
                        disabled={!submitted}
                        onChange={this.handleSliderChange}
                        value={currentFrame/(totalFrame-1)}
                        step={1/(totalFrame-1)}
                        style={styles.slider} />
                </div>

                <p style={styles.label}>
                    {submitted? `${currentFrame + 1}/${totalFrame}`: '-/-'}
                </p>

                <IconButton
                    style={styles.specToggle}
                    iconStyle={styles.specIcon}
                    tooltip={<p>Show specifications</p>}
                    tooltipPosition="top-left"
                    onTouchTap={this.handleSpecToggle}
                    iconClassName="material-icons">
                    insert_comment
                </IconButton>

                <Dialog
                    modal={false}
                    open={this.state.open}
                    bodyStyle={styles.spec}
                    bodyClassName="markdown-body"
                    onRequestClose={this.handleSpecToggle}>
                    <div dangerouslySetInnerHTML={{__html: marked(spec.message)}} />
                </Dialog>
            </Paper>
        );
    }
}
