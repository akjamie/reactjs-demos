import {useRef, useState, createContext, useContext, useEffect} from "react";
import './index.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const message = "This is a message from the App component!";

function Button() {
    const [count, setCount] = useState(0);
    const handleClick = (e) => {
        setCount(count + 1);
        console.log(e);
    }

    return <button onClick={handleClick}>Counter: {count}</button>;
}

function A({onGetMessage}) {
    const name = 'Jack';
    return (<div>
        This is A component
        <button onClick={() => onGetMessage("Hi " + name + ', how are you?[from A component]')}>Send</button>
    </div>)
}

function B({ message }) {
    return (<div>
        This is B component, {message}
    </div>)
}

function C() {
    return (<div>
        This is C component
        <D/>
    </div>)
}

function D() {
    const message = useContext(MessageContext)
    return (<div>
        This is D component, {message}
    </div>)
}

const MessageContext = createContext();

function App() {
    const handleClick = (name, e) => {
        alert('You clicked ' + name + '!');
        console.log(e);
    }
    const [name, setName] = useState({name: 'Jack', age: 35});

    const [value, setValue] = useState('');

    const [content, setContent] = useState('')
    const contentRef = useRef(null)

    const submit = () => {
        // react toast to display the message
        toast(content);
    }

    const reset = () => {
        setContent('');
        contentRef.current.focus();
    }

    const getMessage = (message) => {
        toast(message);
        setMessage(message);
    }
    const [message, setMessage] = useState('');

    const url = "http://geek.itheima.net/v1_0/channels";
    const[channels, setChannels] = useState([]);
    useEffect(() => {
        async function getChannels() {
            const response = await fetch(url);
            const data = await response.json();
            //setChannels(data.data.channels);
            console.log(data);
            return data;
        }
        getChannels().then(r => setChannels(r.data.channels)).catch(e => console.log(e));
    }, []);

    return (<div className="App">
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

        {/* Testing the form*/}
        <div style={{
            marginTop: '5px',
            marginBottom: '5px',
            backgroundColor: '#ddd',
            paddingTop: '5px',
            paddingLeft: '5px',
            width: '420px'
        }}>

                <textarea key='description' style={{display: 'block'}} rows={6} cols={40}
                          value={content}
                          ref={contentRef}
                          onChange={(e) => setContent(e.target.value)}>< /textarea>

            <span style={{display: 'inline-block', marginTop: '10px', marginBottom: '10px', width: '100%'}}>
                <button style={{
                    marginRight: '15px',
                    left: '40%',
                    position: 'relative',
                    color: 'white',
                    border: '0px',
                    backgroundColor: 'blue'
                }} onClick={() => submit()}>Submit</button>
                <button style={{color: 'white', border: '0px', backgroundColor: 'blue'}}
                        onClick={() => reset()}>Reset</button>
                    </span>
        </div>

        <ToastContainer/>

        {/* Testing the message passing from one component to another */}
        <A onGetMessage = {getMessage}/>
        <B message = {message}/>


        {/* Testing the message passing from one component to nested component */}
        <MessageContext.Provider value={message}>
            <C/>
        </MessageContext.Provider>

        {/* useEffect */}
        <label>Channels:</label>
        {channels.map(channel => <li key={channel.id}>{channel.name}</li>)}
    </div>);
}

export default App;
