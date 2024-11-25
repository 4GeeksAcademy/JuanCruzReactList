const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			createContact: (fullName, phone, email, address) => {
				// console.log(fullName,email,address,phone);

				fetch('https://playground.4geeks.com/contact/agendas/juancruz/contacts', {
					method: "POST",
					body: JSON.stringify(
						{
							"name": fullName,
							"phone": phone,
							"email": email,
							"address": address

						}),
					headers: {
						"content-type": "application/json"
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.log(error)
					}
					)
			},

			getContact: () => {
				// console.log(fullName,email,address,phone);

				fetch('https://playground.4geeks.com/contact/agendas/juancruz', {
					method: "GET",

					headers: {
						"content-type": "application/json"
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data);
						setStore({ contacts: data.contacts })
					})
					.catch((error) => {
						console.log(error)
					}
					)
			},

			createAgenda: () => {


				fetch('https://playground.4geeks.com/contact/agendas/juancruz', {
					method: "POST",
					body: JSON.stringify(),
					headers: {
						"content-type": "application/json"
					}
				})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.log(error)
					}
					)
			},

			//funcion borrado

			deleteCard: (id) => {
				fetch('https://playground.4geeks.com/contact/agendas/juancruz/contacts/' + id, {
					method: "DELETE",

					headers: {
						"content-type": "application/json"
					}
				})

					.then((response) => {
						if (!response.ok) {
							console.log("Error en la respuesta");
							return
						}
						return response.json;
					})
					.then(() => {

						const updatedContacts = getStore().contacts.filter(contact => contact.id !== id);
						setStore({ contacts: updatedContacts });
						console.log("Contacto eliminado");
					})


					.catch((error) => {
						console.log(error)
					}
					)
			},

			editCard: (id, name, phone, email, address) => {
				// Hacer la solicitud PUT para actualizar el contacto en la API
				fetch(`https://playground.4geeks.com/contact/agendas/juancruz/contacts/${id}`, {
				  method: 'PUT',
				  headers: {
					'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({ name, phone, email, address }),
				})
				  .then((response) => response.json())
				  .then((updatedContact) => {
					// Una vez que la API ha respondido, actualizamos el estado global de contactos
					const updatedContacts = getStore().contacts.map((contact) =>
					  contact.id === id ? updatedContact : contact
					);
			  
					setStore({ contacts: updatedContacts }); // Actualizamos el store con los datos modificados
					console.log("Contacto actualizado:", updatedContact);
				  })
				  .catch((error) => {
					console.error('Error al actualizar el contacto:', error);
				  });
			  },


			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
