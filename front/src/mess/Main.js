import React, { Component } from 'react';
import AppView from '../component/appview';
import Canvas from '../recourses/canvas';

class Main extends Component {
    constructor(props){
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress(){
        sessionStorage.setItem("loggedUser", "");
    }
    render() {
        return (
            <div className="Main">
                <header>
                </header>
                <body>
                <tr><AppView/></tr>
                <tr><Canvas/></tr>
                </body>
            </div>
        );}
    }


export default Main;