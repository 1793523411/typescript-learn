import React from 'react';
import logo from './logo.svg';
import MyComponent from './components/MyComponent'
import { MyComponent2 } from './components/MyComponent2'
import Foo from './components/MyAwesomeComponent'
import MyComponent3  from './components/MyComponent3'
import Example  from './components/Example'
import Example2  from './components/Example2'
import Hello  from './components/Hello'
import Hello2  from './components/Hello2'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyComponent foo="MyComponent"/>
        <MyComponent2 foo="Class Component"/>
        <Foo />
        <MyComponent3 header={ <MyComponent foo="Header"/>} body={<MyComponent2 foo="Body"/>}/>
        <Example />
        <Example2 value="Example2" onChange={(v) => console.log(v)}/>
        <Hello framework="React"/>
        <Hello2 framework="React2"/>
      </header>
    </div>
  );
}

export default App;
