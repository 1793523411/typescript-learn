import * as React from 'react';

type Props = {
    header: React.ReactNode;
    body: React.ReactNode;
};

export default class MyComponent extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                {this.props.header}
                <br />
                {this.props.body}
            </div>
        );
    }
}
