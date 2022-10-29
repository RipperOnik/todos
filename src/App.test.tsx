import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./components/App";
import user from "@testing-library/user-event";

test("should allow a user to add item", async () => {
  render(<App />);
  const input = await screen.findByLabelText("todo-text");
  user.type(input, "todo item");
  const addTodoButton = await screen.findByLabelText("add-todo-btn");
  user.click(addTodoButton);
  const todos = await screen.findAllByTestId(/^todo-/);
  expect(todos.length).toEqual(1);
});

test("should clear out the input when a user adds an item", async () => {
  render(<App />);
  const input = await screen.findByLabelText("todo-text");
  user.type(input, "todo item");
  const addTodoButton = await screen.findByLabelText("add-todo-btn");
  user.click(addTodoButton);
  expect((input as HTMLInputElement).value).toEqual("");
});

test("should check a clicked item", async () => {
  render(<App />);
  const input = await screen.findByLabelText("todo-text");
  user.type(input, "todo item");
  const addTodoButton = await screen.findByLabelText("add-todo-btn");
  user.click(addTodoButton);
  let todos = await screen.findAllByTestId(/^todo-/);
  user.click(todos[0]);
  expect((todos[0] as HTMLInputElement).checked).toEqual(true);
});

test("should allow a user to delete item", async () => {
  render(<App />);
  const input = await screen.findByLabelText("todo-text");
  user.type(input, "todo item");
  const addTodoButton = await screen.findByLabelText("add-todo-btn");
  user.click(addTodoButton);
  let todos = await screen.findAllByTestId(/^todo-/);
  user.click(todos[0]);
  const deleteTodoButton = await screen.findByLabelText("delete-todo-btn");
  user.click(deleteTodoButton);
  expect(screen.queryAllByTestId(/^todo-/)).toHaveLength(0);
});
