import React, { useEffect, useState } from "react";

const Home = () => {
  const [textIn, setTextIn] = useState("");
  const [textStay, setTextStay] = useState([]);
  const userURL =
    "https://playground.4geeks.com/apis/fake/todos/user/joshemcr2";

  const creatingUser = () => {
    fetch(userURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => window.location.reload(false));
  };

  const gettingData = () => {
    fetch(userURL, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "Primero usa el metodo post para craer un usuario") {
          creatingUser();
        } else {
          const newArray = textStay.concat(data);
          setTextStay(newArray);
        }
      });
  };

  useEffect(() => {
    gettingData();
  }, []);

  const puttingData = (array) => {
    fetch(userURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(array),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const deletingData = () => {
    fetch(userURL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => response.json())
      .then(creatingUser());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newArray = textStay.concat({ label: textIn, done: false });
      setTextStay(newArray);
      puttingData(newArray);
      setTextIn("");
    }
  };

  const handleDelete = (index) => {
    const newArray = textStay.filter((_, current) => index !== current);
    setTextStay(newArray);
    if (newArray.length === 0) {
      deletingData();
    } else {
      puttingData(newArray);
    }
  };

  return (
    <div className="container">
      <h1>To Do list con Fetch y API</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setTextIn(e.target.value)}
            placeholder="Escribe Las Tareas Por Hacer"
            value={textIn}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-danger"
            type="button"
            onClick={deletingData}
          >
            Eliminar
          </button>
        </li>
        {textStay.map((line, index) => (
          <li key={index} id="listElement">
            {line.label}
            <i
              className="fas fa-trash-alt"
              onClick={() => handleDelete(index)}
            ></i>
          </li>
        ))}
      </ul>

      <h4 style={{ fontSize: 20, marginTop: 50 }}>
        {textStay.length === 0
          ? "No hay tarea, agrega una tarea!"
          : `${textStay.length} items`}
      </h4>
    </div>
  );
};

export default Home;
