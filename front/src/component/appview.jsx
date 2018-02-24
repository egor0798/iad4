import React from "react"
import {connect} from "react-redux"
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import PointForm from './PointForm';
import {deleteUsr} from "../api/user-api";
import store from "../store";
import {exit} from "../actions/user-actions";

class AppView extends React.Component {
    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
        this.deleteUser =this.deleteUser.bind(this);
    }
    componentDidMount(){
        if(this.props.user == ""){
            this.props.history.push("/");
        }
    }

    deleteUser(){
        deleteUsr(this.props.user);
        this.props.history.push("/");
        sessionStorage.setItem("loggedUser", "");
        store.dispatch(exit());

    }

    onPress(){
        sessionStorage.setItem("loggedUser", "");
    }
    render() {
        const style={
            display:'inline-block',
            marginLeft: '40px'
        };
        return <div>
            <tr>
                <td>
                    <Link to="/" onClick={this.onPress}>Log Out</Link>
                </td>
                <td style={style}/>
                <td>
                    <button onClick={this.deleteUser}>Delete user</button>
                </td>
            </tr>
            <p/>
            <PointForm/>
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