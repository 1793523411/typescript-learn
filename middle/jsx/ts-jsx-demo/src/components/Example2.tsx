import React from 'react';

export default class FocusingInput extends React.Component<{ value: string; onChange: (value: string) => any }, {}> {
    input: HTMLInputElement | null = null;

    render() {
        return (
            <input
                ref={input => (this.input = input)}
                value={this.props.value}
                onChange={e => {
                    this.props.onChange(e.target.value);
                    console.log(this.input)
                }}
            />
        );
    }
    focus() {
        if (this.input != null) {
            this.input.focus();
            console.log(this.input)
        }
    }
}