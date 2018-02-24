import React from "react"
import Canvas from '../recourses/canvas'
import {addOnePoint, getPoints} from "../api/point-api";
import {deletePoints} from "../api/point-api";
import {connect} from "react-redux";
import store from "../store";

//TODO валидация полей ввода - не вводить буквы
class PointForm extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteUser= this.deleteUser.bind(this);
        this.increase = this.increase.bind(this);
        this.state = {rval:1};
    }

    componentDidMount(){
        store.subscribe(()=>this.forceUpdate());
        getPoints(store.getState().userState.login);
    }

    increase(e) {
        e.preventDefault();
        let r = Number(document.getElementById("rValue").value);
        r += 0.5;
        if (r === 4) r = 1;
        const {name} = e.target;
        this.setState({ [name]: r });
        Canvas.updateCanvas(r);
    }

    add(e) {
        e.preventDefault();
        addOnePoint(this.refs.x.value, this.refs.y.value, this.refs.r.value, this.props.user);
    }

    delete(e) {
        e.preventDefault();
        console.log(this.props.user);
        let r = Number(document.getElementById("rValue").value);
        deletePoints(this.props.user,r);

    }

    deleteUser(e){
        e.preventDefault();
    }

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

        return(
            <div>
                <div>
                    X:<input id="xval" ref="x"/>
                    Y:<input id="yval" ref="y"/>
                    R:<input type="button" id="rValue" name="rval" value={this.state.rval} onClick={this.increase} ref="r"/>
                    <button id="pointAdd" onClick={this.add}>Add</button>
                    <button onClick={this.delete}>Delete all</button>
                </div>
                <div>
                    <table border="1">
                        <tr>
                            <td align="center">X</td>
                            <td align="center">Y</td>
                            <td align="center">Res</td>
                        </tr>
                        {this.createList()}
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        points: store.pointState.points,
        user: store.userState.login
    }
}

export default connect(mapStateToProps)(PointForm);
