import React from 'react';
import { Router, Route, Switch, BrowserRouter} from 'react-router-dom';
import Register from './component/register';
import Login from './component/login';
import createHistory from 'history/createBrowserHistory'
import Main from "./mess/Main";
const browserHistory = createHistory();
//TODO сделать нормальный роутер, добавив главнуб страницу и страницу ошибки
//TODO все написанные ранее классы лежат в папке mess. надо бы их переработать и использовать

export default (
    <BrowserRouter>
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/main" component={Main}/>
        </Switch>
    </Router>
    </BrowserRouter>
);