import React from "react"
import {connect} from "react-redux"
import Canvas from '../recourses/canvas'
import store from '../store'
import * as actions from '../actions/point-actions'
import points from "../reducers/point-reducer";
import {addOnePoint, getPoints} from "../api/point-api";
import {deletePoints} from "../api/point-api";
// import {createBrowserHistory} from "react-router-dom"
// import browserHistory from 'react-router';
import { createBrowserHistory } from 'history'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
// import Redirect
import {withRouter} from "react-router-dom";

class PointForm extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
        this.increase = this.increase.bind(this);
        this.state = {rval:1};
    }

    increase(e) {
        e.preventDefault();
        let r = Number(document.getElementById("rValue").value);
        r += 0.5;
        if (r === 4) r = 1;
        const { name, value } = e.target;
        this.setState({ [name]: r });
        Canvas.updateCanvas(r);
    }

    add(e) {
        e.preventDefault();
        addOnePoint(this.refs.x.value, this.refs.y.value, this.refs.r.value, store.getState().userState.login);
    }

    delete(e) {
        e.preventDefault();
        deletePoints(store.getState().userState.login);

    }

    deleteUser(e){
        e.preventDefault();

    }



    render() {

        return <div>
            X:<input id="xval" ref="x"/>
            Y:<input id="yval" ref="y"/>
            R:<input type="button" id="rValue" name="rval" value={this.state.rval} onClick={this.increase} ref="r"/>
            <button id="pointAdd" onClick={this.add}>Add</button>
            <button onClick={this.delete}>Delete all</button>
            <button onClick={this.deleteUser}>Delete user</button>
        </div>
    }
}


class PointsList extends React.Component {
    createList() {

        return this.props.points.map((point) => {
            return(
                <tr>
                    <td align="center">{point.x}</td>
                    <td align="center">{point.y}</td>
                    <td align="center">{point.r}</td>
                </tr>
            );
        })
    }



    render() {
        console.log(this.props.points);
        return (
            <table border="1">
                <tr>
                    <td align="center">X</td>
                    <td align="center">Y</td>
                    <td align="center">Res</td>
                </tr>
                {this.createList()}
            </table>);
    }
}


class AppView extends React.Component {
    componentDidMount(){
        store.subscribe(()=>this.forceUpdate());
        console.log("Login:" + store.getState().userState.login);
        if(store.getState().userState.login == ""){
            this.props.history.push("/");
        }
        getPoints(store.getState().userState.login);
    }


    render() {
        return <div>
            <PointForm />
            <PointsList {...this.props} />
        </div>
    }
}


function mapStateToProps(store) {
    return {
        points: store.pointState.points,
        user: store.userState.login
    }
}


export default withRouter(connect(mapStateToProps)(AppView));