import React, {ChangeEvent, useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
            <div>
                <label htmlFor="input" >Type your next todo</label>
            </div>
            <TextField data-testid="input" id="input" value={task} onChange={handleChange} />
            <Button variant="contained" onClick={addToList}>Click to Add</Button>
        </>

    );
}