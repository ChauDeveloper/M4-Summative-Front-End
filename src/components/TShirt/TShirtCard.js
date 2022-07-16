function TShirtCard({ tShirt, notify }) {

    function handleDelete() {
        fetch(`http://localhost:8080/tshirt/${tShirt.tShirtId}`, { method: "DELETE" })
            .then(() => notify({ action: "delete", tShirt: tShirt }))
            .catch(error => notify({ action: "delete", error: error }));
    }


    return (
        <tr key={tShirt.tShirtId}>
            <td>{tShirt.size}</td>
            <td>{tShirt.color}</td>
            <td>{tShirt.description}</td>
            <td>{tShirt.price}</td>
            <td>{tShirt.quantity}</td>
            <td>
                <button id="deleteButton" className="btn btn-danger mr-3" type="button" onClick={handleDelete}>Delete</button>
                <button id="editButton" className="btn btn-secondary" type="button" onClick={() => notify({ action: "edit-form", tShirt: tShirt })}>Edit</button>
            </td>
        </tr>
    );
}

export default TShirtCard;
