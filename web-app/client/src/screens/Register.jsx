import React, { Component } from 'react';
import "../styling/Login.css"

class Register extends Component {
    render() {
        return(
            <div className="login-cont">
                <div className="header">
                    <div className="title logo">Dear Diary</div>
                    <div className="subtitle note">Sorry you need to type this one</div>
                </div>
                <form>
                    <input type="text" name="username" placeholder="USERNAME"></input>
                    <input type="text" name="username" placeholder="EMAIL"></input>
                    <input type="password" name="password" placeholder="PASSWORD"></input>
                </form>
                <div className="footer">
                <button className="get-started-btn ui button" type="button">Sign Up</button>
                    <p className="note">Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        );
    }
}

export default Register;