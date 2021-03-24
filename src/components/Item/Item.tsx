import React from "react";
import ToDo from "../../interfaces/ToDo";
import styles from "./Item.module.css";
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForever from '@material-ui/icons/DeleteForever';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

interface ItemProps {
  index: number;
  toDo: ToDo;
  handleDelete: (index: number) => void;
  handleComplete: (index: number) => void;
}

export default function Item(props: ItemProps) {

    const { index, toDo, handleDelete, handleComplete } = props;
    const { list, listItem } = styles;
    const itemClasses = toDo.isCompleted ? `${styles.completed}` : ``;

    const removeFromList = () => handleDelete(index);

    const toggleStatus = () => handleComplete(index);

    return (
        <ListItem data-testid={`${toDo.text}`} className={`${itemClasses} ${list} ${listItem}`}>
            <Checkbox data-testid={`${toDo.text} checkbox`} onClick={toggleStatus} />
            <Typography variant="h5">{toDo.text}</Typography>
            <DeleteForever data-testid={`${toDo.text} deleteIcon`} onClick={removeFromList} />
        </ListItem>
    );
}