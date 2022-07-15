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

    function levelClick(event){
        if(event.target.value == ""){
            setGames([]);
        } else {
            fetch(`http://localhost:8080/game?level=${event.target.value}`)
            .then(response => response.json())
            .then(result => setGames(result))
            .catch(error => console.log(error))
        }
    }

    function stateClick(event){
        if(event.target.value == ""){
            setGames([]);
        } else {
            fetch(`http://localhost:8080/game?state=${event.target.value}`)
            .then(response => response.json())
            .then(result => setGames(result))
            .catch(error => console.log(error))
        }
    }





    function addClick() {
        setScopedGame({ id: 0, title: "", lastName: "", esbrRating:"", description:"", price:"", studio:"", quantity:""});
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
            case "level":

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
                <select name="level" onChange={levelClick}>
                    <option>Get Game by Level</option>
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Bronze</option>
                </select>
                <select name="state" onChange={stateClick}>
                    <option>Get Game by State</option>
                    <option>florida</option>
                    <option>california</option>
                    <option>texas</option>
                    <option>ariona</option>

                </select>
                
                <table id='game'>
                    <tr>
                        <th>Title</th>
                        <th>Esbr Rating</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Studio</th>
                        <th>Quantity</th>                
                    </tr>
                    <tbody>
                        {games.map(r => <GameCard key={r.gameId} game={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Game;