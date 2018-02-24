import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <body>
            <form>
            <p>Enter your name:</p>
            <input type="text" id="name"/>
            <br/>
            <p>Enter your password:</p>
            <input type="password" id="password"/>
            <br/>
            <br/>
            <input type="submit" value="Sign In"/>
            </form>
            <br/>
            <br/>
            <p>Not registered yet?</p>
            <Link to="/register">Sign Up Now</Link>
        </body>
      </div>
    );
  }
}

export default App;
