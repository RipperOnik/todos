import React, { useState } from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import TodoItem from "../interfaces/TodoItem";
import CheckBox from "./CheckBox";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TabNames } from "../resources/resources";
import { Button } from "react-bootstrap";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [key, setKey] = useState(TabNames.All);

  function onChangeTodo(e: React.ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value);
  }
  function addItem() {
    setTodos((prevTodos) => [
      ...prevTodos,
      { text: todoText, completed: false },
    ]);
    setTodoText("");
    if (key === TabNames.Completed) setKey(TabNames.All);
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addItem();
  }

  function deleteCompleted() {
    const newTodos = todos.filter((item) => {
      return item.completed === false;
    });
    setTodos(newTodos);
  }

  function calculateCurrentTodosLength() {
    if (key === TabNames.Active) {
      return todos.filter((item) => item.completed === false).length;
    } else if (key === TabNames.Completed) {
      return todos.filter((item) => item.completed === true).length;
    }
    return todos.length;
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>todos</h1>
      </div>
      <Form onSubmit={submit}>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="What needs to be done?"
            onChange={onChangeTodo}
            value={todoText}
            className="mb-3"
            aria-label="todo-text"
          />
          {/* <Button
            style={{ height: "36px", margin: "0px 10px" }}
            onClick={addItem}
            aria-label="add-todo-btn"
          >
            Add
          </Button> */}
        </div>

        {todos.map((item, index) => {
          if (key === TabNames.Active) {
            if (item.completed === false) {
              return (
                <CheckBox
                  id={index + ""}
                  key={index}
                  label={item.text}
                  onChange={(e) => {
                    setTodos((prevTodos) => [
                      ...prevTodos.slice(0, index),
                      { text: item.text, completed: e.target.checked },
                      ...prevTodos.slice(index + 1),
                    ]);
                  }}
                  checked={todos[index].completed}
                />
              );
            }
          } else if (key === TabNames.Completed) {
            if (item.completed === true) {
              return (
                <CheckBox
                  id={index + ""}
                  key={index}
                  label={item.text}
                  onChange={(e) => {
                    setTodos((prevTodos) => [
                      ...prevTodos.slice(0, index),
                      { text: item.text, completed: e.target.checked },
                      ...prevTodos.slice(index + 1),
                    ]);
                  }}
                  checked={todos[index].completed}
                />
              );
            }
          } else if (key === TabNames.All) {
            return (
              <CheckBox
                id={index + ""}
                key={index}
                label={item.text}
                onChange={(e) => {
                  setTodos((prevTodos) => [
                    ...prevTodos.slice(0, index),
                    { text: item.text, completed: e.target.checked },
                    ...prevTodos.slice(index + 1),
                  ]);
                }}
                checked={todos[index].completed}
              />
            );
          }
        })}
      </Form>

      <div className="d-flex justify-content-between panel">
        <div style={{ paddingTop: "8px" }}>
          {calculateCurrentTodosLength()} items left
        </div>

        <div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {
              if (k !== null) setKey(k);
            }}
            style={{
              marginBlockStart: "0px",
              marginBlockEnd: "0px",
              paddingInlineStart: "0px",
              color: "grey",
            }}
          >
            <Tab eventKey={TabNames.All} title={TabNames.All} />

            <Tab eventKey={TabNames.Active} title={TabNames.Active} />

            <Tab eventKey={TabNames.Completed} title={TabNames.Completed} />
          </Tabs>
        </div>

        <button
          className="button-custom"
          onClick={deleteCompleted}
          aria-label="delete-todo-btn"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
