import axios from 'axios';
import store from '../store';
import {setErr,  clearErr} from "../actions/error-actions";
import {addAll, addPoint, deleteAllPoints} from "../actions/point-actions";
import {log_in} from "../actions/user-actions";
import Canvas from "../recourses/canvas"

export function addOnePoint(x,y,r,login){
    var res;
    var u = -x;
    r=Number(r);
    u=Number(u+r);
    if ((y<=u && y>=0 && y<=r && x>=0 && x<=r)||(x*x+y*y<=(r/2)*(r/2) && x<=0 && y>=0)||(x<=0 && x>=-1*r && y<=0 && y>=-1*r)) res=true;
    else res=false;
    const point = {
        x: x,
        y: y,
        r:r,
        result:res
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

export function deletePoints(login, r) {
    console.log("method delete");
    console.log(login);
    return axios.get('http://localhost:8080/'+ login + '/deletePoints')
        .then(response =>{
            console.log(response.status);
            store.dispatch(deleteAllPoints());
            Canvas.updateCanvas(r);
    }).catch(error => {
        console.log("Ошибка: "+ error.toString());
    });
}
