import React, { useContext, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";



export const AddContact = () => {
	const {store,actions} = useContext(Context);
	const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("");



	const handleSubmit = () => {

    if(!name || !phone || !email || !address){
      alert("Por favor rellene todos los campos")
      return;
    }
    

		actions.createContact(name,phone,email,address)
    
	}



	return(
    <div className="cardBody">
	<div className="text-center mt-5">
		<form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-6">
    <label for="name" className="form-label" >Full Name</label>
    <input type="text" className="form-control" placeholder="Add full name" onChange={e => setName(e.target.value)} value={name} id="name" />
  </div>
  <div className="col-md-6">
    <label for="phone" className="form-label">Phone</label>
    <input type="text" className="form-control" id="phone" placeholder="Ej : 695358795" onChange={e => setPhone(e.target.value)} value={phone}/>
  </div>
  <div className="col-6">
    <label for="email" className="form-label" >E-mail</label>º
    <input type="text" className="form-control" id="email" placeholder="Ej: 1234@gmail.com " onChange={e => setEmail(e.target.value)} value={email}/>
  </div>
  <div className="col-6">
    <label for="address" className="form-label" >Address</label>
    <input type="text" className="form-control" id="address" placeholder="Put your Address" onChange={e => setAdress(e.target.value)} value={address}/>
  </div>
  
  <div className="col-12">
    <button type="submit" className="btn btn-success">Add Contact</button>
  </div>
</form>
	</div>
  </div>
		
);
}
