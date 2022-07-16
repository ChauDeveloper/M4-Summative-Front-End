import { useState, useEffect } from 'react';
import './Game.css';
import GameCard from './GameCard.js';
import GameForm from './GameForm.js';

function Game() {

    const [games, setGames] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedGame, setScopedGame] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/games")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(console.log);
    }, []);


    function ratingClick(event){     
        if(event.target.value === ""){
            setGames([]);
        } else {
            fetch(`http://localhost:8080/games?esrbRating=${event.target.value}`)
            .then(response => response.json())
            .then(result => setGames(result))
            .catch(error => console.log(error))
        }
    }

    function titleClick(event){       
        event.preventDefault();   
        if(document.getElementById("title").value === ""){
            setGames([]);
        } else {
            fetch(`http://localhost:8080/games?title=${document.getElementById("title").value}`)
            .then(response => response.json())
            .then(result => setGames(result))
            .catch(error => console.log(error))
        }
    }

    function studioClick(evt){
        evt.preventDefault();
        if(document.getElementById("studio").value === ""){
            setGames([]);
        } else {
            fetch(`http://localhost:8080/games/studio/${document.getElementById("studio").value}`)
            .then(response => response.json())
            .then(result => setGames(result))
            .catch(error => console.log(error))
        }
    }


    function addClick() {
        setScopedGame({ id: 0, title: "", description: "", esrbRating:"", price:"", studio:"", quantity:""});
        setShowForm(true);
    }

    function notify({ action, game, error }) {
        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }
        switch (action) {
            case "add":
                setGames([...games, game]);
                break;
            case "edit":
                setGames(games.map(e => {
                    if (e.id === game.id) {
                        return game;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedGame(game);
                setShowForm(true);
                return;
            case "delete":
                setGames(games.filter(e => e.id !== game.id));
                break;
           
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <GameForm game={scopedGame} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='gameTitle'>Games</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Game</button>
                <select name="esrbRating" onChange={ratingClick}>
                    <option>Get Game by ESRB Rating</option>
                    <option>E</option>
                    <option>E10+</option>
                    <option>T</option>
                    <option>M</option>
                    <option>AO</option>
                    <option>RP</option>
                </select>

                <form name="titleForm" onSubmit={titleClick}>
                <label htmlFor="title">Get Game by Title</label>
                <input type="text" id="title" name="title" ></input>
                <input type="submit" value="Submit" ></input>
                </form>

                <div>
                <form name="studioForm" onSubmit={studioClick}>
                <label htmlFor="studio" >Get Game by Studio</label>
                <input type="text" id="studio" name="studio"></input>
                <input type="submit" value="Submit" ></input>
                </form>
                </div>
            
                <table id='game'>
                    <tr>
                        <th>Title</th>
                        <th>Esrb Rating</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Studio</th>
                        <th>Quantity</th>                
                    </tr>
                    <tbody>
                        {games.map(g => <GameCard key={g.gameId} game={g} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Game;