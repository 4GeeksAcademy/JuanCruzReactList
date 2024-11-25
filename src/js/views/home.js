import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.createAgenda();
    actions.getContact();
  }, []);

  const [view, setView] = useState("none");
  const [card, setCard] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Maneja los cambios en los campos del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));

    if (name === "name") setName(value);
    if (name === "phone") setPhone(value);
    if (name === "email") setEmail(value);
    if (name === "address") setAddress(value);
  };

  // Cargar los datos del contacto al editar
  const handleEdit = (contact) => {
    setCard(contact);
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
    setAddress(contact.address);
    setView("block");
  };

  // Guardar los cambios en el contacto
  const handleSaveChanges = () => {
    actions.editCard(card.id, name, phone, email, address);
    setView("none");
  };

  return (
    <>
      <div className="cardBody">
        {store.contacts.map((contact) => (
          <div className="card" key={contact.id}>
            <div className="card-header">Full Name: {contact.name}</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Phone: {contact.phone}</li>
              <li className="list-group-item">E-mail: {contact.email}</li>
              <li className="list-group-item">Address: {contact.address}</li>
            </ul>
            <button
              className="btn btn-danger"
              onClick={() => actions.deleteCard(contact.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleEdit(contact)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="boton" style={{ paddingTop: "15px" }}>
        <Link className="btn btn-success" to="/add-contact">
          Add Contact
        </Link>
      </div>

      {/* Modal */}
      <div className="modal" style={{ display: view }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Contact</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setView("none")}
              ></button>
            </div>
            <div className="modal-body">
              <label>Full Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Add full name"
                onChange={handleChange}
                value={name}
              />

              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Ej: 695358795"
                onChange={handleChange}
                value={phone}
              />

              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Ej: 1234@gmail.com"
                onChange={handleChange}
                value={email}
              />

              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Put your Address"
                onChange={handleChange}
                value={address}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setView("none")}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};