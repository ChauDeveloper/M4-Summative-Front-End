import { useState, useEffect } from "react";
import "./Invoice.css";
import InvoiceCard from "./InvoiceCard.js";
import InvoiceForm from "./InvoiceForm.js";

function Invoice() {
  const [Invoice, setInvoice] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scopedInvoice, setScopedInvoice] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/invoice")
      .then((response) => response.json())
      .then((result) => setInvoice(result))
      .catch(console.log);
  }, []);

  function addClick() {
    setScopedInvoice({ id: 0, name: "", street: "", city:"", state:"", zipcode:"", itemType:"", itemId: "", unitPrice:"", quantity: "", subTotal:"", tax:"", processingFee:"", tottal:""});
    setShowForm(true);
}

  function notify({ action, invoice, error }) {
    if (error) {
      setError(error);
      setShowForm(false);
      return;
    }
    switch (action) {
      case "add":
        setInvoice([...invoice, invoice]);
        break;
      case "edit":
        setInvoice(
          invoice.map((e) => {
            if (e.id === invoice.id) {
              return invoice;
            }
            return e;
          })
        );
        break;
        case "edit-form":
            setScopedInvoice(invoice);
            setShowForm(true);
            return;
            case "delete":
                setInvoice(invoice.filter((e)=> e.id !== invoice.id));
                break;
    }
    setError("");
    setShowForm(false);
  }
  if(showForm){
      return <InvoiceForm invoice = {scopedInvoice} notify = {notify} />
  }

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 id="invoiceTitle">Invoice</h1>
        <button className="btn btn-primary" type="button" onClick={addClick}>
          Add an Invoice
        </button>
        {/* <div>
          <form name="manufacturerForm" onSubmit={manufacturerClick}>
            <label htmlFor="manufacturer">Get Console by Manufacturer</label>
            <input type="text" id="manufacturer" name="manufacturer"></input>
            <input type="submit" value="Submit"></input>
          </form>
        </div> */}
        <table id="invoice">
          <tr>
            <th>Name</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zopcode</th>
            <th>Item Type</th>
            <th>Item Id</th>
            <th>Unit Price</th>
            <th>Qunatity</th>
            <th>Subtotal</th>
            <th>Tax</th>
            <th>Processing Fee</th>
            <th>Total</th>
          </tr>
          <tbody>
            {Invoice.map((i) => (
              <InvoiceCard key={i.id} invoice={i} notify={notify} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Invoice;
