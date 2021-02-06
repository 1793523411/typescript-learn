import React from 'react';

const Hello: React.SFC<{
    /**
     * @default 'TypeScript2'
     */
    compiler?: string;
    framework: string;
}> = ({
    compiler = 'TypeScript2', // Default prop
    framework
}) => {
        return (
            <div>
                <div>{compiler}</div>
                <div>{framework}</div>
            </div>
        );
    };

export default Hello