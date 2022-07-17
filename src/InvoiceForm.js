import { useState } from "react";
function InvoiceForm({ invoice: intialInvoice, notify }) {
  const [invoice, setInvoice] = useState(intialInvoice);
  const isAdd = intialInvoice.invoiceId === 0;

  function handleChange(evt) {
    const clone = { ...invoice };
    clone[evt.target.name] = evt.target.value;
    setInvoice(clone);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const url = isAdd
      ? "http://localhost:8080/invoice"
      : `http://localhost:8080/invoice`;
    const method = isAdd ? "POST" : "PUT";
    const expectedStatus = isAdd ? 201 : 204;

    const init = {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(invoice),
    };

    fetch(url, init)
      .then((response) => {
        if (response.status === expectedStatus) {
          if (isAdd) {
            return response.json();
          } else {
            return invoice;
          }
        }
        return Promise.regect(
          `Did not recive expected status: ${expectedStatus}`
        );
      })
      .then((result) => {
        notify({
          action: isAdd ? "add" : "edit",
          invoice: result,
        });
      })
      .catch((error) => {
        notify({ error: error });
      });
  }

  return (
    <div>
      <h1>{invoice.invoiceId > 0 ? "Edit" : "Add"} Invoice </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <lable htmlFor="name">Name</lable>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={invoice.model}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="street">Street</lable>
          <input
            type="text"
            id="street"
            name="street"
            className="form-control"
            value={invoice.street}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="city">City</lable>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={invoice.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="state">State</lable>
          <input
            type="text"
            id="state"
            name="state"
            className="form-control"
            value={invoice.state}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="zipcode">Zipcode</lable>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            className="form-control"
            value={invoice.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="itemType">Item Type</lable>
          <input
            type="text"
            id="itemType"
            name="itemType"
            className="form-control"
            value={invoice.itemType}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="itemId">Item Id</lable>
          <input
            type="text"
            id="itemId"
            name="itemId"
            className="form-control"
            value={invoice.itemId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="unitPrice">Unit Price</lable>
          <input
            type="text"
            id="unitPrice"
            name="unitPrice"
            className="form-control"
            value={invoice.unitPrice}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="quantity">Quantity</lable>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="form-control"
            value={invoice.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="subtotal">Subtotal</lable>
          <input
            type="text"
            id="subtotal"
            name="subtotal"
            className="form-control"
            value={invoice.subTotal}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="tax">Tax</lable>
          <input
            type="text"
            id="tax"
            name="tax"
            className="form-control"
            value={invoice.tax}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="processingFee">Processing Fee</lable>
          <input
            type="text"
            id="processingFee"
            name="processingFee"
            className="form-control"
            value={invoice.processingFee}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <lable htmlFor="total">Total</lable>
          <input
            type="text"
            id="total"
            name="total"
            className="form-control"
            value={invoice.total}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary mr-3" type="submit">
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => notify({ action: "cancel" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default InvoiceForm;
