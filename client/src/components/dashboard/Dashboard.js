import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);
  async function getName() {
    try {
      const response = await fetch("/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setAllTodos(parseRes);
      setName(parseRes[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out");
  };
  useEffect(() => {
    getName();
    setTodosChange(false);
  }, [todosChange]);
  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h1> {name}'s' Todo List</h1>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </Fragment>
  );
};

export default Dashboard;
