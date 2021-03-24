import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

//  Question - why can't I pull const { getByText } = render(<App />) to the top and into global scope
//  therefore eliminating the repetition within each test


test('renders title', () => {
  const { getByText } = render(<App />);
  getByText("Todo 7");
});

test('renders add button', () => {
  const { getByText } = render(<App />);
  getByText("Click to Add");
});

test('renders label', () => {
  const { getByLabelText } = render(<App />);
  getByLabelText("Type your next todo")
});

test('new todo appears in DOM', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  getByText("get bread");
});

test('after new todo appears in DOM, the input is cleared', () => {
  const { getByLabelText, getByText, getByTestId } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  expect(input.innerHTML).toBe('');
});

test('renders delete button after adding element', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  getByTestId("get bread deleteIcon");
});

test('renders checkbox after adding element', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  getByTestId("get bread checkbox");
});

test('alert message shows when attempting to enter a blank todo', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  window.alert = jest.fn();

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(addButton);
  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('alert message shows when attempting to enter a duplicate todo', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  window.alert = jest.fn();

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('todo text does not appear in list after clicking its delete icon', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);

  const getBreadText = getByText("get bread");
  fireEvent.click(getByTestId("get bread deleteIcon"));
  expect(getBreadText).not.toBeInTheDocument()
});

test('deleting a individual todos doesnt affect other todos', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get eggs" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get meat" } });
  fireEvent.click(addButton);

  fireEvent.click(getByTestId("get bread deleteIcon"));
  fireEvent.click(getByTestId("get meat deleteIcon"));

  expect(getByTestId("get eggs")).toBeInTheDocument();
  expect(getByTestId("get milk")).toBeInTheDocument();

  //  I expected these to work, but they did not
  // expect(getByTestId("get bread")).not.toBeInTheDocument();
  // expect(getByTestId("get meat") as HTMLElement).toBeNull();
});

test('adding a todo increments the number of remaining tasks', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  getByText("There is 1 task remaining.");

  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  getByText("There are 2 tasks remaining.");
});

test('clicking a checkbox decrements the number of remaining tasks', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  getByText("There are 2 tasks remaining.");

  const specifiedCheckbox = getByTestId("get bread checkbox");
  fireEvent.click(specifiedCheckbox);
  getByText("There is 1 task remaining.");
});

test('number of remaining tasks only shows when list has todos', ()=> {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const bannerText = getByTestId("remainingTasks");
  expect(bannerText.innerHTML).toBe("");

  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  expect(bannerText.innerHTML).toBe("There is 1 task remaining.");
});

test('count of remaining tasks is removed by checking all todo boxes', ()=> {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  const bannerText = getByTestId("remainingTasks");

  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get eggs" } });
  fireEvent.click(addButton);
  expect(bannerText.innerHTML).toBe("There are 3 tasks remaining.");

  fireEvent.click(getByTestId("get bread checkbox"));
  fireEvent.click(getByTestId("get milk checkbox"));
  fireEvent.click(getByTestId("get eggs checkbox"));
  expect(bannerText.innerHTML).toBe('');
});


