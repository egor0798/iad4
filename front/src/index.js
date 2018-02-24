import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import router from './router';
// TODO почитать что делает эта строчка
require('es6-promise').polyfill();
ReactDOM.render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('root')
);


// старый код
// var React = require("react");
// var redux = require("redux");
// var Provider = require("react-redux").Provider;
// var reducer = require("./reducers/pointState.jsx");
// var AppView = require("./mess/appview.jsx");
// var store = redux.createStore(reducer);
//
// store.dispatch({
//     type: "SET_STATE",
//     state: {
//         points: []
//     }
// });
// class App extends Component{
//     render(){
//         return(
//             <Provider store={store}>
//                 <AppView />
//             </Provider>
//         );
//     }
// }