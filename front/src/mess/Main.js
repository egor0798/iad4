import React, { Component } from 'react';
import AppView from '../component/appview';
import Canvas from '../recourses/canvas';
import '../recourses/index.css'

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
                <tr>
                    <td id="left" width="300px">
                        <AppView/>
                    </td>
                    <td>
                        <Canvas/>
                    </td>
                </tr>
            </div>
        );}
    }


export default Main;