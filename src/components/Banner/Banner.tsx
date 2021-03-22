import React from "react";

interface BannerProps {
    countOfRemainingTodos: () => number;
}

export default function Banner(props: BannerProps) {

    const { countOfRemainingTodos } = props;

    return (
        <>
            <h1>Todo 7</h1>
            <h2>{countOfRemainingTodos()}</h2>
        </>

    );
}