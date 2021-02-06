import React from 'react';

type Props = {
    foo: string;
};

const MyComponent: React.FunctionComponent<Props> = props => {
    return <span>{props.foo}</span>;
};

export default MyComponent