import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships : props.ships,
            filteredShips : props.ships,
            activeFilters : {
                nation : '',
                type : '',
                level : ''
            },
            filters : {
                nation : props.filters.nation,
                type : props.filters.type,
                level : props.filters.level,
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
    changeFilter = (filter, value) => {
        let object = {
            activeFilters: this.state.activeFilters
        }
        object.activeFilters[filter] = value;
        this.setState(object, this.filterShips);
    }
    handleClickItem = (id, event) => {
        let ships = this.state.filteredShips;
        ships[id]['added'] = !ships[id]['added'];
        this.setState({
            filteredShips : ships
        });

    }
    filterShips = () => {
        let results = [];
        let result = [];
        if (this.state.activeFilters.nation !== '' ||
            this.state.activeFilters.type !== '' ||
            this.state.activeFilters.level !== '') {
            for (let index = 0; index < this.state.ships.length; index++) {
                let pushed = false;
                if (this.state.activeFilters.nation !== '') {
                    if (this.state.activeFilters.nation !== this.state.ships[index].nation) {
                        continue;
                    }
                    results.push(this.state.ships[index]);
                    pushed = true;
                }
                if (this.state.activeFilters.type !== '') {
                    if (this.state.activeFilters.type !== this.state.ships[index].type) {
                        if (pushed) {
                            results.pop();
                        }
                        continue;
                    }
                    if (!pushed) {
                        results.push(this.state.ships[index]);
                        pushed = true;
                    }
                }
                if (this.state.activeFilters.level !== '') {
                    if (parseInt(this.state.activeFilters.level) !== this.state.ships[index].level) {
                        if (pushed) {
                            results.pop();
                        }
                        continue;
                    }
                    if (!pushed) {
                        results.push(this.state.ships[index]);
                        pushed = true;
                    }
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
                    filters={ this.state.filters }
                    activeFilters={ this.state.activeFilters }
                    handleClickItem={ this.handleClickItem }
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
                    changeSearch={ this.props.changeSearch }
                    changeFilter={ this.props.changeFilter }
                    filters={ this.props.filters }
                    activeFilters={ this.props.activeFilters }
                />
                <MainBody
                    handleClickItem={ this.props.handleClickItem }
                    ships={ this.props.ships }/>
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
    handleFilterChange = (event) => {
        this.props.changeFilter(event.target.name, event.target.value);
    }
    render() {
        let filters = {
            nation : [],
            type : [],
            level : [],
        }
        for (let index in this.props.filters) {
            this.props.filters[index].forEach((filter) =>
                filters[index].push(
                    <option
                            key={ filter } value={ filter }>
                        { filter }
                    </option>
                )
            )
        }
        filters['nation'].unshift(
            <option key='Нация' value=''>Нация</option>
        )
        filters['type'].unshift(
            <option key='Класс' value=''>Класс</option>
        )
        filters['level'].unshift(
            <option key='Уровень' value=''>Уровень</option>
        )
        return (
            <header className="app-main-header">
                <div className="app-main__search-container">
                    <input
                        onChange={this.changeInput}
                        value={ this.props.search }
                        type="text" placeholder="Найти корабль" className="app-main__search-input" />
                </div>
                <div className="app-main__filters-container">
                    <select value={ this.props.activeFilters.nation } name={ 'nation' } onChange={ this.handleFilterChange }>
                        { filters.nation }
                    </select>
                    <select value={ this.props.activeFilters.type } name={ 'type' } onChange={ this.handleFilterChange }>
                        { filters.type }
                    </select>
                    <select value={ this.props.activeFilters.level } name={ 'level' } onChange={ this.handleFilterChange }>
                        { filters.level }
                    </select>
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
            ships.push(
                <MainBodyItem handleClickItem={ this.props.handleClickItem }
                key={ ship.id } ship={ ship } />)
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
    let classes = '';
    if (props.ship['added']) {
        classes = 'app-main__item ship-item active';
    }
    else {
        classes = 'app-main__item ship-item';
    }
    return (
        <div
            data-id={ props.ship.id }
            onClick={ props.handleClickItem.bind(this, props.ship.id) }
            className={ classes } >
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
