import React from 'react';

class MyAwesomeComponent extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}

// class Demo extends React.Component {
//     render(){
//         return <Foo />
//     }
// }

const Foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
//   const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Error!

export default MyAwesomeComponent