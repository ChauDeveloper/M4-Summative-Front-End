import { useState, useEffect } from 'react';
import './Console.css';
import ConsoleCard from './ConsoleCard.js';
import ConsoleForm from './ConsoleForm.js';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Console() {

    const [consoles, setConsoles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedConsole, setScopedConsole] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/console")
        .then(response => response.json())
        .then(result => setConsoles(result))
        .catch(console.log);
    }, []);  

    function manufacturerClick(evt){
        evt.preventDefault();
        if(document.getElementById("manufacturer").value === ""){
            setConsoles([]);
        } else {
            fetch(`http://localhost:8080/console/manufacturer/${document.getElementById("manufacturer").value}`)
            .then(response => response.json())
            .then(result => setConsoles(result))
            .catch(error => console.log(error))
        }
    }


    function addClick() {
        setScopedConsole({ consoleId: 0, model: "", manufacturer: "", memoryAmount:"", processor:"", price:"",  quantity:""});
        setShowForm(true);
    }

    function notify({ action, console, error }) {
        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }
        switch (action) {
            case "add":
                setConsoles([...consoles, console]);
                break;
            case "edit":
                setConsoles(consoles.map(e => {
                    if (e.consoleId === console.consoleId) {
                        return console;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedConsole(console);
                setShowForm(true);
                return;
            case "delete":
                setConsoles(consoles.filter(e => e.consoleId !== console.consoleId));
                break;
           
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <ConsoleForm console={scopedConsole} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='consoleTitle'>Consoles</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Console</button>           
                <div>
                <form name="manufacturerForm" onSubmit={manufacturerClick}>
                <label htmlFor="manufacturer" >Get Console by Manufacturer</label>
                <input type="text" id="manufacturer" name="manufacturer"></input>
                <input type="submit" value="Submit" ></input>
                </form>
                </div>
            
                <table id='console'>
                    <tr>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Memory Amount</th>
                        <th>Processor</th>
                        <th>Price</th>
                        <th>Quantity</th>                
                    </tr>
                    <tbody>
                        {consoles.map(g => <ConsoleCard key={g.consoleId} console={g} notify={notify} />)}
                    </tbody>
                </table>
                <button><Link to="/">Back</Link></button>
            </div>
        </>
    )
}

export default Console;