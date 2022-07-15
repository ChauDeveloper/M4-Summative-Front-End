import { useState } from 'react';

function GameForm({ game: initialGame, notify }) {

    const [game, setGame] = useState(initialGame);
    const isAdd = initialGame.id === 0;

    function handleChange(evt) {
        const clone = { ...game };
        clone[evt.target.name] = evt.target.value;
        setGame(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/games" : `http://localhost:8080/games${game.id}`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(game)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return game;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                game: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{game.id > 0 ? "Edit" : "Add"} Game</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="artist">Title</label>
                    <input type="text" id="firstName" name="firstName"
                        className="form-control"
                        value={game.firstName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="album">Esbr Rating</label>
                    <input type="text" id="lastName" name="lastName"
                        className="form-control"
                        value={game.lastName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Description</label>
                    <input type="text" id="street" name="street"
                        className="form-control"
                        value={game.street} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="year">Price</label>
                    <input type="text" id="city" name="city"
                        className="form-control"
                        value={game.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="state">Studio</label>
                    <input type="text" id="state" name="state"
                        className="form-control"
                        value={game.state} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="zipCode">Quantity</label>
                    <input type="text" id="zipCode" name="zipCode"
                        className="form-control"
                        value={game.zipCode} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <select htmlFor="level" name="level" on onChange={handleChange} value={game.level}>
                    <option>Level</option>
                    <option>Gold</option>
                    <option>Silver</option>
                    <option>Bronze</option>
                </select>
                
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary mr-3" type="submit">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default GameForm;