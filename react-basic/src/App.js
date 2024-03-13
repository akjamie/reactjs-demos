import {useState} from "react";
import './index.css';

const message = "This is a message from the App component!";

function Button() {
    const [count, setCount] = useState(0);
    const handleClick = (e) => {
        setCount(count + 1);
        console.log(e);
    }

    return <button onClick={handleClick}>Counter: {count}</button>;
}

function App() {
    const handleClick = (name, e) => {
        alert('You clicked ' + name + '!');
        console.log(e);
    }
    const [name, setName] = useState({name: 'Jack', age: 35});

    const [value, setValue] = useState('');

    return (
        <div className="App">
          <span className="App-header" style={{color: 'red'}}>
            {message}
          </span>

            <button onClick={(e) => handleClick('Jack', e)}>Click me</button>

            {/* 自闭和*/}
            <Button/>

            {/* 成对标签*/}
            <Button></Button>

            {/* Test useState for object */}
            {/* apply the css class */}
            <div className='foo'>{name.name}</div>
            <div>
                <label>Input a name</label>
                <input id='name'/>
                <button onClick={() => setName({name: document.getElementById("name").value, age: 25})}>Modify</button>
            </div>

            <input value={value}
                   onChange={(e) => setValue(e.target.value)}
                   type="text"/>
        </div>);
}

export default App;
