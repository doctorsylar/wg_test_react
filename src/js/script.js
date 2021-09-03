import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './app/app';

let ships = [];

fetch('./app/ships.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        ships = data;
    });

console.log(ships);
// let todoData = JSON.parse(localStorage.getItem('todoData'));

ReactDOM.render(
    <React.StrictMode>
        <TodoApp ships={ ships } />
    </React.StrictMode>,
    document.querySelector('#app')
);