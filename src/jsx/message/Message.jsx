import React from 'react';
import _ from 'lodash';
import { Dialog, FlatButton } from 'material-ui';

const styles = {
    error: {
        textAlign: 'left',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        OUserSelect: 'none',
        MozUserSelect: 'none'
    }
};

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (_.isEqual(nextProps.message, this.props.message))
            return;

        let message = nextProps.message
            .filter(item => item !== 'ok')
            .map(item => {
                let [first, second] = item.split(' ');
                switch (first) {
                    case 'winner':
                        if (second == '1')
                            return `White wins.`;
                        else if (second == '2')
                            return `Black wins.`;
                        break;

                    case 'draw':
                        return `Draw!`;

                    case 'invalid':
                        if (second == '1')
                            return `White performs an invalid move.`;
                        else if (second == '2')
                            return `Black performs an invalid move.`;
                        break;

                    case 'terminated':
                        return 'Program terminated unexpectedly.';

                    default:
                        return false;
                }
            });

        if (message.length !== 0) {
            this.setState({ show: true, message: message.join(' ') });
        } else
            this.setState({ show: false, message: null });
    }

    render() {
        let actions = (
            <FlatButton
                label="Okay"
                primary={true}
                onTouchTap={() => {this.setState({show: false});}} />
        );
        return (
            <Dialog
                modal={false}
                actions={actions}
                open={this.state.show}
                onRequestClose={() => {this.setState({show: false});}}>
                <h1 style={styles.error}>
                    {this.state.message}
                </h1>
            </Dialog>
        );
    }
}
