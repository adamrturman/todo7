import React from "react";
import Item from "../Item/Item";
import ToDo from "../../interfaces/ToDo";

interface ListProps {
    list: ToDo[];
    handleDelete: (index: number) => void;
    handleComplete: (index: number) => void;
}

export default function List(props: ListProps) {
    const { list, handleDelete, handleComplete }= props;

    const displayedList = list.map((toDo: ToDo, index: number) => (
      <Item
          index={index}
          toDo={toDo}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
      />

    ));

    return (
        <ul>
            {displayedList}
        </ul>
    );
}