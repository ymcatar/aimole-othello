import React from 'react';
import _ from 'lodash';
import { Dialog } from 'material-ui';

const styles = {
    error: {
        textAlign: 'center',
        fontWeight: 'lighter'
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
        return (
            <Dialog
                modal={false}
                open={this.state.show}
                onRequestClose={() => {this.setState({show: false});}}>
                <h1 style={styles.error}>
                    {this.state.message}
                </h1>
            </Dialog>
        );
    }
}
