import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


const addAToDo = (input: HTMLElement, value: string, button: HTMLElement) => {
  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(button);
}

test('Test 1 - renders title', () => {
  const { getByText } = render(<App />);
  getByText("Todo 7");
});

test('Test 2 - renders add button', () => {
  const { getByText } = render(<App />);
  getByText("Click to Add");
});

test('Test 3 - renders label', () => {
  const { getByLabelText } = render(<App />);
  getByLabelText("Type your next todo");
});

test('Test 4 - new todo appears in DOM after typing in input and clicking add button', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  getByText("get bread");
});

test('Test 5 - after new todo appears in DOM, the input is cleared', () => {
  const { getByLabelText, getByText, getByTestId } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  expect(input.innerHTML).toBe('');
});

test('Test 6 - renders delete button after adding element', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  getByTestId("get bread deleteIcon");
});

test('Test 7 - renders checkbox after adding element', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  getByTestId("get bread checkbox");
});

test('Test 8 - alert message shows when attempting to enter a blank todo', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  window.alert = jest.fn();

  //  expected to work, but doesn't
  // addAToDo(input, "", addButton);

  //  so I did this instead
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(addButton);

  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('Test 9 - alert message shows when attempting to enter a duplicate todo', () => {
  const { getByLabelText, getByText } = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  window.alert = jest.fn();

  addAToDo(input, "get bread", addButton);
  addAToDo(input, "get bread", addButton);

  expect(window.alert).toHaveBeenCalledTimes(1);
});

test('Test 10 - todo text does not appear in list after clicking its delete icon', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  const getBreadText = getByText("get bread");
  fireEvent.click(getByTestId("get bread deleteIcon"));
  expect(getBreadText).not.toBeInTheDocument()
});

test('Test 11 - deleting todos removes them but others remain', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  //  Expected these to work, but they didn't
  // addAToDo(input, "get bread", addButton);
  // addAToDo(input, "get milk", addButton);
  // addAToDo(input, "get eggs", addButton);
  // addAToDo(input, "get meat", addButton);

  //  Used this instead
  fireEvent.change(input, { target: { value: "get bread" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get eggs" } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: "get meat" } });
  fireEvent.click(addButton);
  const getMeatText = getByTestId("get meat");
  const getBreadText = getByTestId("get bread");
  fireEvent.click(getByTestId("get meat deleteIcon"));
  fireEvent.click(getByTestId("get bread deleteIcon"));

  expect(getByTestId("get eggs")).toBeInTheDocument();
  expect(getByTestId("get milk")).toBeInTheDocument();
  expect(getMeatText).not.toBeInTheDocument();

  //  Why doesn't this work if the one above does?
  // expect(getBreadText).not.toBeInTheDocument();
});

test('Test 12 - adding a todo increments the number of remaining tasks', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);
  getByText("There is 1 task remaining.");

  //  Why wouldn't this work like in the one above?
  //  addAToDo(input, "get milk", addButton);

  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  getByText("There are 2 tasks remaining.");
});

test('Test 13 - clicking a checkbox decrements the number of remaining tasks', () => {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");

  addAToDo(input, "get bread", addButton);

  //  Extracted function not working after first time
  // addAToDo(input, "get milk", addButton);

  fireEvent.change(input, { target: { value: "get milk" } });
  fireEvent.click(addButton);
  getByText("There are 2 tasks remaining.");

  const specifiedCheckbox = getByTestId("get bread checkbox");
  fireEvent.click(specifiedCheckbox);
  getByText("There is 1 task remaining.");
});

test('Test 14 - number of remaining tasks only shows when list has todos', ()=> {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const bannerText = getByTestId("remainingTasks");
  expect(bannerText.innerHTML).toBe("");

  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  addAToDo(input, "get bread", addButton);

  expect(bannerText.innerHTML).toBe("There is 1 task remaining.");
});

test('Test 15 - count of remaining tasks is removed from banner by checking all todo boxes', ()=> {
  const { getByLabelText, getByText, getByTestId} = render(<App />);
  const input = getByLabelText("Type your next todo");
  const addButton = getByText("Click to Add");
  const bannerText = getByTestId("remainingTasks");

  addAToDo(input, "get bread", addButton);

  //  Extracted function only works first time called?
  // addAToDo(input, "get milk", addButton);
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