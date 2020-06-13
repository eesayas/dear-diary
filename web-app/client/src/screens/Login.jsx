import React, { Component } from 'react';
import "../styling/Login.css"

class Login extends Component {
    render() {
        return(
            <div className="login-cont">
                <div className="header">
                    <div className="title logo">Dear Diary</div>
                    <div className="subtitle note">Sorry you need to type this one</div>
                </div>
                <form>
                    <input type="text" name="username" placeholder="USERNAME"></input>
                    <input type="password" name="password" placeholder="PASSWORD"></input>
                </form>
                <div className="footer">
                <button className="get-started-btn ui button" type="button">Sign In</button>
                    <p className="note">Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
            </div>
        );
    }
}
export default Login;