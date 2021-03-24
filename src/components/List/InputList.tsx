import React from "react";
import Item from "../Item/Item";
import ToDo from "../../interfaces/ToDo";
import List from '@material-ui/core/List';


interface ListProps {
    list: ToDo[];
    handleDelete: (index: number) => void;
    handleComplete: (index: number) => void;
}

export default function InputList(props: ListProps) {
    const { list, handleDelete, handleComplete }= props;

    const displayedList = list.map((toDo: ToDo, index: number) => (
      <Item
          key={index}
          index={index}
          toDo={toDo}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
      />
    ));

    return (
        <List>
            {displayedList}
        </List>
    );
}