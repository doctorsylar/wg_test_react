import React from 'react';

class Body extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="app-main">
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
                <div className="app-main-body">
                    <div className="app-main__list"></div>
                </div>
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
            selection : 'all',
            tasks : this.props.tasks === null ? [] : this.props.tasks,
            checked : [],
        }
    }
    render() {
        return (
            <div className="app">
                <Body

                ></Body>
                <Results

                ></Results>
            </div>
        );
    }
}
export default App;
