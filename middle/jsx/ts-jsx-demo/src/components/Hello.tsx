import React from 'react';

export default class Hello extends React.Component<{
    /**
     * @default 'TypeScript'
     */
    compiler?: string;
    framework: string;
}> {
    static defaultProps = {
        compiler: 'TypeScript'
    };
    render() {
        const compiler = this.props.compiler!;
        return (
            <div>
                <div>{compiler}</div>
                <div>{this.props.framework}</div>
            </div>
        );
    }
}