import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {login_try} from '../api/user-api'
import { createBrowserHistory } from 'history';
import {connect} from "react-redux";
import {clearErr, setErr} from "../actions/error-actions"
import {register} from "../api/user-api";
import store from "../store";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lgn:"",
            psw:"",
            psw1:"",
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        store.dispatch(clearErr());
    }

    onChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    handleSubmit(e){
        e.preventDefault();
        this.setState({submitted:true});
        store.dispatch(clearErr());
        console.log(this.state.lgn, this.state.psw, this.state.psw1);
        if(this.state.psw !== this.state.psw1) {
            store.dispatch(setErr("Passwords do not match"));
        }
        if(this.state.lgn && this.state.psw && this.state.psw === this.state.psw1) {
            register(this.state.lgn, this.state.psw, this.props.history);
        }
    }

    render()
    {
        const help_block = {
            fontSize:' 12px',
            color:'red'
        };
        const headerMsg = {
            fontSize:' 20px',
            color:'red'
        };
        const { lgn, psw, psw1, submitted } = this.state;
        return (
            <div className="app">
                <header>
                </header>
                <body>
                <div style={headerMsg}>{this.props.message}</div>
                <form onSubmit={this.handleSubmit}>
                    <p>Enter your name </p>
                    <input type="text" name="lgn" value={lgn} id="name" onChange={this.onChange}/>
                    { submitted && !lgn && <div style={help_block}>login is required</div>}
                    <br/>
                    <p>Enter your password:</p>
                    <input type="password" name="psw" value={psw} id="password" onChange={this.onChange}/>
                    { submitted && !psw && <div style={help_block}>password is required</div>}
                    <br/>
                    <p>Confirm your password:</p>
                    <input type="password" name="psw1" value={psw1} id="password1" onChange={this.onChange}/>
                    { submitted && !psw1 && <div style={help_block}>confirm your password</div>}
                    <br/>
                    <br/>
                    <input type="submit" value="Register"/>
                </form>
                <h1>Back to login</h1>
                <Link to="/">Login</Link>
                </body>
            </div>
        );
    }
}
const mapStateToProps = function(store) {
    return {
        message: store.errorState.message
    };
};

export default connect(mapStateToProps)(Register);