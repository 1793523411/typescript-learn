import * as React from 'react';

type Props = {
    foo: string;
};

class MyComponent2 extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>;
    }
}

export { MyComponent2 }