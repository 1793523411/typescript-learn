import * as React from 'react';

class Example extends React.Component {
    example() {
        // ... something
    }

    render() {
        return <div>Foo</div>;
    }
}

export default class Use extends React.Component {
    exampleRef: Example | null = null;

    render() {
        return <Example ref={exampleRef => (this.exampleRef = exampleRef)} />;
    }
}