import axios from 'axios';
import store from '../store';
import {setErr,  clearErr} from "../actions/error-actions";
import {addAll, addPoint, deleteAllPoints} from "../actions/point-actions";
import {log_in} from "../actions/user-actions";
import Canvas from "../recourses/canvas"

export function addOnePoint(x,y,r,login){
    const point = {
        x: x,
        y: y,
        r:r,
        result:true
    };
    return axios.post('http://localhost:8080/'+login+"/addPoint", JSON.stringify(point),{headers:{'Content-Type': 'application/json',}})
        .then(response => {
            console.log(response.status);
            store.dispatch(addPoint(point));
        }).catch(error => {
            console.log("Ошибка: "+ error.toString());
        });
}

export function getPoints(login){
    return axios.get('http://localhost:8080/'+ login + '/getTable')
        .then(response =>{
            // TODO переделать
            let points = [];
            let jsonData =  JSON.parse(JSON.stringify(response.data));
            for(var i = 0; i < jsonData.length; i++){
                const point = {
                    x: jsonData[i].x,
                    y: jsonData[i].y,
                    r: jsonData[i].r,
                    result: jsonData[i].result
                };
                store.dispatch(addPoint(point));
            }
            Canvas.updateCanvas(1);

        }).catch(error => {
            console.log("Ошибка: "+ error.toString());
        });
}

export function deletePoints(login) {
    console.log("method delete");
    return axios.delete('http://localhost:8080/'+ login + '/deletePoints')
        .then(response =>{
            console.log(response.status);
        store.dispatch(deleteAllPoints());
    }).catch(error => {
        console.log("Ошибка: "+ error.toString());
    });
}
