import React from "react";
import ToDo from "../../interfaces/ToDo";
import styles from "./Item.module.css";

interface ItemProps {
  index: number;
  toDo: ToDo;
  handleDelete: (index: number) => void;
  handleComplete: (index: number) => void;
}

export default function Item(props: ItemProps) {

    const { index, toDo, handleDelete, handleComplete } = props;
    const itemClasses = toDo.isCompleted ? `${styles.completed}` : ``;

    const removeFromList = () => handleDelete(index);

    const toggleStatus = () => handleComplete(index);

    const buttonText = toDo.isCompleted ? `Unmark` : `Mark`;

    return (
        <li className={itemClasses} key={index}>
            <span>{toDo.text}</span>
            <button onClick={removeFromList}>Delete</button>
            <button onClick={toggleStatus}>{buttonText}</button>
        </li>
    );
}