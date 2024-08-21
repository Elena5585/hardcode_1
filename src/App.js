import "./App.css";
import React, { useState, useEffect } from "react";
import { requestUsers, requestUsersWithError } from "./api.js";

function App() {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [errorMessage, seterrorMessage] = useState("Loading...");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  window.onload = filterUsers();

  async function filterUsers() {
    try {
      let data = [];
      if (name.length && age.length) {
        data = await requestUsers({
          name: "",
          age: "",
          limit: limit,
          offset: offset,
        });
        let newUsers = data.filter((user) =>
          user.name.toLowerCase().startsWith(name.toLowerCase())
        );
        setUsers(newUsers.filter((user) => user.age === Number(age)));
      } else if (name.length) {
        data = await requestUsers({
          name: "",
          age: "",
          limit: limit,
          offset: offset,
        });
        setUsers(
          data.filter((user) =>
            user.name.toLowerCase().startsWith(name.toLowerCase())
          )
        );
      } else if (age.length) {
        data = await requestUsers({
          name: "",
          age: "",
          limit: limit,
          offset: offset,
        });
        setUsers(data.filter((user) => user.age === Number(age)));
      } else {
        data = await requestUsers({
          name: "",
          age: "",
          limit: limit,
          offset: offset,
        });
        setUsers(data);
      }
      if (!users.length) {
        seterrorMessage("Users not found");
      } else {
        seterrorMessage("Loading...");
      }
      return users;
    } catch (e) {
      throw Error(e);
    }
  }

  function prevPage() {
    if (page > 1) {
      setOffset(offset - limit);
      setPage(page - 1);
      filterUsers();
    }
  }
  function nextPage() {
    setOffset(page * limit);
    console.log(users.length);
    filterUsers();
    if (users.length > 0) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    filterUsers();
  }, [name]);
  useEffect(() => {
    filterUsers();
  }, [age]);
  useEffect(() => {
    filterUsers();
    console.log(offset, limit, page);
  }, [page]);

  return (
    <div className="App">
      <div className="container">
        <div className="container__inputs">
          <input
            type="text"
            value={name}
            className="container__input"
            id="name"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={age}
            className="container__input"
            id="age"
            name="age"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {users?.length ? (
          <div className="conatainer__list">
            {users.map((user, key) => (
              <div className="container__list-item" key={key}>
                <span>{user?.name},</span>
                <span>{user?.age}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="container__message">{errorMessage}</div>
        )}
        <div className="container__filter">
          <div className="container__filter-block">
            <span className="container__block-label">By page:</span>
            <select
              className="container__block-select"
              defaultValue={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className="container__filter-block">
            <button className="container__block-btn" onClick={prevPage}>
              prev
            </button>
            <span className="container__block-label special-margin">
              page : {page}
            </span>
            <button className="container__block-btn" onClick={nextPage}>
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
