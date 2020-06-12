import React, { Component } from 'react';

class Login extends Component {
    render() {
        return(
            <div>
                <input type="text" name="username"></input>
                <input type="password" name="password"></input>
            </div>
            
        );
    }
}

export default Login;