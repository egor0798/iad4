import React from 'react';
import {Link} from 'react-router-dom';
import {clearErr, setErr} from '../actions/error-actions'
import axios from 'axios';
import {login_try} from '../api/user-api'
import {connect} from "react-redux";
import store from "../store";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {lgn:"", psw:"", submitted: false, message:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        if(sessionStorage.getItem("loggedUser"))
            this.props.history.push("/main");
        store.dispatch(clearErr());
    }

    onChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    handleSubmit(e){
        e.preventDefault();
        this.setState({submitted:true});
        if(this.state.lgn && this.state.psw){
            login_try(this.state.lgn, this.state.psw, this.props.history);
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
        const { lgn, psw, submitted} = this.state;
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
                    <br/>
                    <input type="submit" value="Sign In"/>
                </form>
                <h1>Not registered yet?</h1>
                <Link to="/register">Register</Link>
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

export default connect(mapStateToProps)(Login);