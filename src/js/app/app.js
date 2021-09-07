import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships : props.ships,
            filteredShips : props.ships,
            filters : {
                nation : null,
                class : null,
                level : null
            },
            results : props.results || [],
            search : ''
        }
    }
    changeSearch = (value) => {
        this.setState({
            search: value
        }, this.filterShips);
    }
    changeFilter = (value) => {
        // this.setState({
        //     input: value
        // });
    }
    filterShips = () => {
        let results = [];
        let result = [];
        if (this.state.filters.nation !== null || this.state.filters.class !== null || this.state.filters.level !== null) {
            for (let index = 0; index < this.state.ships.length; index++) {
                for (let fIndex in this.state.filters) {
                    if (this.state.filters[fIndex] !== this.state.ships[index][fIndex]) {
                        break;
                    }
                    results.push(this.state.ships[index]);
                }
            }
        }
        else {
            results = this.state.ships;
        }
        if (this.state.search !== '') {
            for (let index = 0; index < results.length; index++) {
                if (results[index]['title'].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
                    result.push(results[index]);
                }
            }
        }
        else {
            result = results;
        }
        this.setState({
            filteredShips: result
        });
    }
    render() {
        return (
            <div className="app">
                <Main
                    search={ this.state.search }
                    changeSearch={ this.changeSearch }
                    changeFilter={ this.changeFilter }
                    ships={ this.state.filteredShips }

                ></Main>
                <Results

                ></Results>
            </div>
        );
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app-main">
                <MainHeader
                    search={ this.props.search }
                    changeSearch={ this.props.changeSearch }/>
                <MainBody ships={ this.props.ships }/>
            </div>
        )
    }
}

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    changeInput = (event) => {
        this.props.changeSearch(event.target.value);
    }
    render() {
        return (
            <header className="app-main-header">
                <div className="app-main__search-container">
                    <input
                        onChange={this.changeInput}
                        value={ this.props.search }
                        type="text" placeholder="Найти корабль" className="app-main__search-input" />
                </div>
                <div className="app-main__filters-container">
                    <div className="app-main__filter filter-nation">
                        <div className="app-main__filter-current" data-value="null">
                            Нация
                        </div>
                        <ul className="app-main__filter-list">
                            <li className="app-main__filter-item" data-value="null">
                                Нация
                            </li>
                        </ul>
                    </div>
                    <div className="app-main__filter filter-type">
                        <div className="app-main__filter-current" data-value="null">
                            Класс
                        </div>
                        <ul className="app-main__filter-list">
                            <li className="app-main__filter-item" data-value="null">
                                Класс
                            </li>
                        </ul>
                    </div>
                    <div className="app-main__filter filter-level">
                        <div className="app-main__filter-current" data-value="null">
                            Уровень
                        </div>
                        <ul className="app-main__filter-list">
                            <li className="app-main__filter-item" data-value="null">
                                Уровень
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

class MainBody extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log(this.props.ships)
        let ships = [];
        this.props.ships.forEach((ship) =>
            ships.push(<MainBodyItem key={ ship.id } ship={ ship } />)
        )
        return (
            <div className="app-main-body">
                <div className="app-main__list">
                    { ships }
                </div>
            </div>
        )
    }
}

function MainBodyItem(props)  {
    return (
        <div className="app-main__item ship-item"
        >
            <div className="app-main__item-info">
                <span>{ props.ship.nation.toUpperCase() }</span>
                <span>/</span>
                <span>{ props.ship.type }</span>
            </div>
            <div className="app-main__item-title">
                <span>{ props.ship.level } </span>
                <span>{ props.ship.title }</span>
            </div>
            <div className="app-main__ok"></div>
        </div>
    );
}

class Results extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="app-results-container">
                <div className="app-results">
                    <p className="app-results__heading">Выбранные корабли:</p>
                    <div className="app-results-list">

                    </div>
                    <div className="app-results__bottom">
                        <p>Сумма уровней: <span className="app-results__sum">0</span></p>
                    </div>
                    <button type="button" className="app-results__copy">Поделиться</button>
                    <div className="app-results__input-container">
                        <input type="text" className="app-results__link" readOnly />
                    </div>
                    <p className="app-results__copy-text">Ссылка скопирована в буфер обмена</p>
                </div>
            </div>
        )
    }
}


export default App;
