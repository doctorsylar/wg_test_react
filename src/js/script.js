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
        let filters = {
            nation : new Set(),
            level : new Set(),
            type : new Set(),
        }
        data.map(item => {
            let ship = [];
            for (let [key, value] of Object.entries(item) ) {
                ship[key] = value;
                ship['id'] = id;
                if (filters.hasOwnProperty(key)) {
                    filters[key].add(value);
                }
            }
            ships.push(ship);
            id++;
        });
        filters.level = (Array.from(filters.level)).sort(function (a, b) {
            return a - b;
        });
        filters.nation = Array.from(filters.nation);
        filters.type = Array.from(filters.type);
        renderApp (ships, filters);
    });

// let todoData = JSON.parse(localStorage.getItem('todoData'));
function renderApp (ships, filters) {
    ReactDOM.render(
        <React.StrictMode>
            <TodoApp ships={ ships } filters={ filters }/>
        </React.StrictMode>,
        document.querySelector('#app')
    );
}