import React, { useEffect, useState } from "react";
import "./App.css";

function ContactsApp() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const results = contacts.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, contacts]);

  return (
    <div className="container">
      <h1 className="title">Contacts</h1>
      <input
        type="text"
        className="search-box"
        placeholder="Search contacts by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="card"
            onClick={() => setSelected(contact)}
          >
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>
              {contact.address.city}, {contact.address.street}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.name}</h2>
            <p><strong>Username:</strong> {selected.username}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Website:</strong> {selected.website}</p>
            <p><strong>Company:</strong> {selected.company.name}</p>
            <p><strong>Address:</strong> {selected.address.suite}, {selected.address.street}, {selected.address.city}, {selected.address.zipcode}</p>
            <button className="close-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsApp;
