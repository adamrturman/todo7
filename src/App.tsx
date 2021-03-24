import React, {useState} from 'react';
import './App.css';
import ToDo from './interfaces/ToDo'
import Input from "./components/Input/Input";
import InputList from "./components/List/InputList";
import Banner from "./components/Banner/Banner";

function App() {
  const [list, setList] = useState<ToDo[]>([]);

    const addToList = (task: string) => {
        const hasDuplicate = list.reduce((haveSeenDuplicate: boolean, toDo: ToDo) => {
            if (toDo.text === task) {
                return true;
            }
            return haveSeenDuplicate;
        }, false);
        if (hasDuplicate) {
            alert("Duplicate todo not allowed");
            return;
        }
        if (task.length) {
            const toDoToAdd: ToDo = {
                text: task,
                isCompleted: false
            };
            setList([...list, toDoToAdd]);
        } else {
            alert("Duplicate todo not allowed")
        }
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

    const countRemainingTodos = () => {
        return list.reduce((count: number, toDo: ToDo )=> {
            if (!toDo.isCompleted) {
                count++;
            }
            return count;
        }, 0)
    }

  return (
    <div className="App">
      <Banner countRemainingTodos={countRemainingTodos} />
      <Input handleAddToDo={addToList} />
      <InputList
          list={list}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
      />
    </div>
  );
}

export default App;
