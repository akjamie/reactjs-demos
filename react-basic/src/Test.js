import {useEffect, useContext, useState} from "react";

function Son() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Son component is running.")
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log("Son component is unmounted.")
        }
    }, []);

    return <div>
        this is Son.
    </div>
}

function useToggle() {
    const [show, setShow] = useState(true);
    const toggle = () => {
        setShow(!show);
    }
    return [show, toggle];
}

function App() {
    {/*没有依赖项*/
    }
    const [count, setCount] = useState(0);
    // useEffect(() => {
    //     console.log("There is no dependency, just run on component initialization.")
    // })

    {/*有依赖项 - 传入空数组依赖*/
    }
    // useEffect(() => {
    //     console.log("There has dependency, while the dependency is an empty array.")
    // },[])

    {/*有依赖项 - 传入特定的依赖*/
    }
    // useEffect(() => {
    //     console.log("There has given dependency.")
    // }, [count])

    // return (<div>
    //     this is App.
    //     <button onClick={() => setCount(count + 1)}>+{count}</button>
    // </div>)

    // const[show,setShow] = useState(true)
    // return (<div>
    //     {show && <Son/>}
    //     <button onClick={() => setShow(!show)}>Toggle</button>
    // </div>);

    const [show, toggle] = useToggle()

    return (<div>
        {show && <Son/>}
        <button onClick={toggle}>{show ? 'Off' : 'On'}</button>
    </div>);
}

export default App;