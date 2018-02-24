import axios from 'axios';
import store from '../store';
import {log_in} from '../actions/user-actions';
import {setErr,  clearErr} from "../actions/error-actions";
import {deleteAllPoints} from "../actions/point-actions";

export function login_try(login, password, history) {
    let postData = JSON.stringify({login, password});
    console.log(postData);
    return axios.post('http://localhost:8080/validate', postData,{headers:{'Content-Type': 'application/json',}})
        .then(response => {
            console.log(response.status);
            store.dispatch(clearErr());
            store.dispatch(log_in(login, password));
            sessionStorage.setItem("loggedUser", login);
            history.push("/main");
        }).catch(error => {
            console.log(error.toLocaleString());
            store.dispatch(setErr("Wrong username or password."))
        });
}

export function register(login, password, history) {
    let postData = JSON.stringify({login, password});
    console.log(postData);
    return axios.post('http://localhost:8080/registration', postData,{headers:{'Content-Type': 'application/json',}})
        .then(response => {
            console.log(response.status);
            store.dispatch(log_in(login, password));
            store.dispatch(clearErr());
            history.push("/");
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
            store.dispatch(setErr("Username already taken"))
        });
}


export function deleteUsr(login) {
    console.log("method delete");
    return axios.get('http://localhost:8080/'+ login + '/delete')
        .then(response =>{
            console.log(response.status);
            store.dispatch(deleteAllPoints());
        }).catch(error => {
            console.log("Ошибка: "+ error.toString());
        });
}