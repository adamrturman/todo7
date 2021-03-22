import React, {useState} from 'react';
import './App.css';
import ToDo from './interfaces/ToDo'
import Input from "./components/Input/Input";
import List from "./components/List/List";
import Banner from "./components/Banner/Banner";

function App() {
  const [list, setList] = useState<ToDo[]>([]);

    const addToList = (task: string) => {
        const toDoToAdd: ToDo = {
            text: task,
            isCompleted: false
        };
        setList([...list, toDoToAdd]);
    };

    const handleDelete = (index: number) => {
        const listWithDeletion = list.filter((toDo:ToDo, i: number) => i !== index);
        setList(listWithDeletion);
    };

    const handleComplete = (index: number) => {
        const listWithCompletion: ToDo[] = list.map((toDo: ToDo, i: number) => {
            if (i === index) {
                toDo.isCompleted = !toDo.isCompleted
            }
            return toDo;
        });
        setList(listWithCompletion);
    };

    const countOfRemainingTodos = () => {
        return list.reduce((count: number, toDo: ToDo )=> {
            if (!toDo.isCompleted) {
                count++;
            }
            return count;
        }, 0)
    }

  return (
    <div className="App">
      <Banner countOfRemainingTodos={countOfRemainingTodos} />
      <Input handleAddToDo={addToList} />
      <List
          list={list}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
      />
    </div>
  );
}

export default App;
