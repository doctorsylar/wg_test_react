import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './app/app';

let ships = [];

fetch('/ships.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let id = 0;
        data.map(item => {
            let ship = [];
            for (let [key, value] of Object.entries(item) ) {
                ship[key] = value;
                ship['id'] = id;
                id++;
            }
            ships.push(ship);
        });
        renderApp (ships);
    });

// let todoData = JSON.parse(localStorage.getItem('todoData'));
function renderApp (ships) {
    ReactDOM.render(
        <React.StrictMode>
            <TodoApp ships={ ships } />
        </React.StrictMode>,
        document.querySelector('#app')
    );
}