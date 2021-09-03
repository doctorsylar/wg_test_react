import React from 'react';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <header className="app-main-header">
                    <div className="app-main__search-container">
                        <input type="text" placeholder="Найти корабль" className="app-main__search-input" />
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
                <span>{ props.ship.level }</span>
                <span>{ props.ship.title }</span>
            </div>
            <div className="app-main__ok"></div>
        </div>
    );
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
        console.log(ships);
        return (
            <div className="app-main-body">
                <div className="app-main__list">
                    { ships }
                </div>
            </div>
        )
    }
}
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app-main">
                <MainHeader/>
                <MainBody ships={ this.props.ships }/>
            </div>
        )
    }
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
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships : props.ships,
            filters : {
                nation : null,
                class : null,
                level : null
            },
            search : null
        }
    }
    render() {
        return (
            <div className="app">
                <Main ships={ this.state.ships }

                ></Main>
                <Results

                ></Results>
            </div>
        );
    }
}
export default App;
