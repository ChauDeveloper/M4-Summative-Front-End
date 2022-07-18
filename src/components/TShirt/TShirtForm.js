import { useState } from 'react';

function TShirtForm({ tShirt: initialTShirt, notify }) {

    const [tShirt, setTShirt] = useState(initialTShirt);
    const isAdd = initialTShirt.id === 0;

    function handleChange(evt) {
        const clone = { ...tShirt };
        clone[evt.target.name] = evt.target.value;
        setTShirt(clone);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const url = isAdd ? "http://localhost:8080/tshirt" : `http://localhost:8080/tshirt`;
        const method = isAdd ? "POST" : "PUT";
        const expectedStatus = isAdd ? 201 : 204;

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(tShirt)
        };

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json();
                    } else {
                        return tShirt;
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`);
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                tShirt: result
            }))
            .catch(error => notify({ error: error }));

    }

    return (
        <>
            <h1>{tShirt.id > 0 ? "Edit" : "Add"} TShirt</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="color">Color</label>
                    <input type="text" id="color" name="color"
                        className="form-control"
                        value={tShirt.color} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description"
                        className="form-control"
                        value={tShirt.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price"
                        className="form-control"
                        value={tShirt.price} onChange={handleChange} />
                </div>            
                <div className="mb-3">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" id="quantity" name="quantity"
                        className="form-control"
                        value={tShirt.quantity} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <select htmlFor="size" name="size" id ="size" onChange={handleChange} value={tShirt.size}>
                    <option>Select Size</option>
                    <option>XXS</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
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

export default TShirtForm;