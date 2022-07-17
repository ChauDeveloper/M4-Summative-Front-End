function InvoiceCard({invoice, notify}){
    function handleDelet(){
        fetch(`http://localhost:8080/invoice/${invoice.id}`, {method: "DELETE"})
        .then(() => notify({action: "delete", Invoice: invoice}))
        .catch(error => notify({ action: "delete", error: error }));
    }


    return(
        <tr key = {invoice.id}>//Check with invoicemodel
            <td>{invoice.name}</td>
            <td>{invoice.street}</td>
            <td>{invoice.city}</td>
            <td>{invoice.state}</td>
            <td>{invoice.zipcode}</td>
            <td>{invoice.itemType}</td>
            <td>{invoice.itemId}</td>
            <td>{invoice.unitprice}</td>
            <td>{invoice.quantity}</td>
            <td>{invoice.subTotal}</td>
            <td>{invoice.tax}</td>
            <td>{invoice.processingFee}</td>
            <td>{invoice.total}</td>
            <td>
                <button id= "deleteButton" className= "btn btn-danger mr-3" onClick={handleDelet}>Delete</button>
                <button id="editButton" className= "btn btn-secondary" onclick={()=>notify({action:"edit-form", Invoice: invoice})}>Edit</button>
            </td>

        </tr>
    )
}
export default InvoiceCard;