import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships : props.ships,
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
            results : props.results || {},
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
        let results = this.state.results;
        if (ships[id]) ships[id]['added'] = !ships[id]['added'];
        if ( ships[id]['added'] ) {
            results[id] = ships[id]
        }
        else {
            delete results[id];
        }
        this.setState({
            filteredShips : ships,
            results : results
        });
    }
    filterShips = () => {
        let results = this.state.ships.map((ship) => {
            if (this.state.activeFilters.nation !== '') {
                if (this.state.activeFilters.nation !== ship.nation) {
                    ship['hidden'] = true;
                    return ship;
                }
            }
            if (this.state.activeFilters.type !== '') {
                if (this.state.activeFilters.type !== ship.type) {
                    ship['hidden'] = true;
                    return ship;
                }
            }
            if (this.state.activeFilters.level !== '') {
                if (parseInt(this.state.activeFilters.level) !== ship.level) {
                    ship['hidden'] = true;
                    return ship;
                }
            }
            if (this.state.search !== '') {
                if (ship['title'].toLowerCase().indexOf(this.state.search.toLowerCase()) === -1) {
                    ship['hidden'] = true;
                    return ship;
                }
            }
            ship['hidden'] = false;
            return ship;
        });
        this.setState({
            ships: results
        });
    }
    render() {
        return (
            <div className="app">
                <Main
                    search={ this.state.search }
                    changeSearch={ this.changeSearch }
                    changeFilter={ this.changeFilter }
                    ships={ this.state.ships }
                    filters={ this.state.filters }
                    activeFilters={ this.state.activeFilters }
                    handleClickItem={ this.handleClickItem }
                ></Main>
                <Results
                    results={ this.state.results }
                    handleClickItem={ this.handleClickItem }
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
                    ships={ this.props.ships } />
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
        let ships = [];
        this.props.ships.forEach((ship) => {
            if (!ship.hidden) {
                ships.push(
                    <MainBodyItem handleClickItem={this.props.handleClickItem}
                                  key={ship.id} ship={ship}/>)
            }
        })
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
        let results = [];
        for (let id of Object.keys(this.props.results)) {
            results.push(
                <div
                    onClick={ this.props.handleClickItem.bind(this, id) }
                    key={ id } className="app-results__item ship-item" >
                    <div className="app-results__item-info">
                        <span>{ this.props.results[id].nation.toUpperCase() }</span>
                        <span>/</span>
                        <span>{ this.props.results[id].type }</span>
                    </div>
                    <div className="app-results__item-title">
                        <span>{ this.props.results[id].level } </span>
                        <span>{ this.props.results[id].title }</span>
                    </div>
                    <div className="app-results__remove"></div>
                </div>
            )
        }
        return (
            <div className="app-results-container">
                <div className="app-results">
                    <p className="app-results__heading">Выбранные корабли:</p>
                    <div className="app-results-list">
                        { results }
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
