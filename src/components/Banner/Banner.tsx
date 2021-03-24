import React from "react";
import Typography from '@material-ui/core/Typography';

interface BannerProps {
    countRemainingTodos: () => number;
}

export default function Banner(props: BannerProps) {

    const { countRemainingTodos } = props;

    const countToDisplay = countRemainingTodos();

    const isOrAre = countToDisplay === 1 ? `is` : `are`;

    const taskOrTasks = countToDisplay === 1 ? `task` : `tasks`;

    const displayedCountOfRemainingTasks = countToDisplay > 0 ? `There ${isOrAre} ${countToDisplay} ${taskOrTasks} remaining.` : ``;


    return (
        <>
            <Typography variant="h1">Todo 7</Typography>
            <Typography data-testid="remainingTasks" variant="h4">{displayedCountOfRemainingTasks}</Typography>
        </>

    );
}