import React, {ChangeEvent, useState} from "react";

interface InputProps {
    handleAddToDo: (task: string) => void;
}

export default function Input(props: InputProps) {
    const [task, setTask] = useState<string>('');
    const { handleAddToDo } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    };

    const addToList = () => {
        handleAddToDo(task);
        setTask('');
    };


    return (
        <>
            <input value={task} onChange={handleChange} />
            <button onClick={addToList}>Add</button>
        </>

    );
}