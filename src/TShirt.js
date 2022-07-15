import { useState, useEffect } from 'react';
import './TShirt.css';
import TShirtCard from './TShirtCard.js';
import TShirtForm from './TShirtForm.js';

function TShirt() {

    const [tShirts, setTShirts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedTShirt, setScopedTShirt] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/tshirt")
        .then(response => response.json())
        .then(result => setTShirts(result))
        .catch(console.log);
    }, []);


    function sizeClick(event){     
        if(event.target.value == ""){
            setTShirts([]);
        } else {
            fetch(`http://localhost:8080/tshirt/size/${event.target.value}`)
            .then(response => response.json())
            .then(result => setTShirts(result))
            .catch(error => console.log(error))
        }
    }

    function colorClick(event){       
        event.preventDefault();   
        if(document.getElementById("color").value == ""){
            setTShirts([]);
        } else {
            fetch(`http://localhost:8080/tshirt/color/${document.getElementById("color").value}`)
            .then(response => response.json())
            .then(result => setTShirts(result))
            .catch(error => console.log(error))
        }
    }

    function addClick() {
        setScopedTShirt({ id: 0, size: "", color:"", description: "",  price:"", quantity:""});
        setShowForm(true);
    }

    function notify({ action, tShirt, error }) {
        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }
        switch (action) {
            case "add":
                setTShirts([...tShirts, tShirt]);
                break;
            case "edit":
                setTShirts(tShirts.map(e => {
                    if (e.id === tShirt.id) {
                        return tShirt;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedTShirt(tShirt);
                setShowForm(true);
                return;
            case "delete":
                setTShirts(tShirts.filter(e => e.id !== tShirt.id));
                break;
           
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <TShirtForm tShirt={scopedTShirt} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='tShirtTitle'>TShirts</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a TShirt</button>
                <select name="size" onChange={sizeClick}>
                    <option>Get TShirt by Size</option>
                    <option>XXS</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                </select>

                <form name="colorForm" onSubmit={colorClick}>
                <label htmlFor="color">Get TShirt by Color</label>
                <input type="text" id="color" name="color" ></input>
                <input type="submit" value="Submit" ></input>
                </form>
                      
                <table id='tShirt'>
                    <tr>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>                
                    </tr>
                    <tbody>
                        {tShirts.map(g => <TShirtCard key={g.tShirtId} tShirt={g} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TShirt;