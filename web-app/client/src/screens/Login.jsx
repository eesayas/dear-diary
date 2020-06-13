import React, { Component } from 'react';
import history from "../history";
import "../styling/Login.css";
import api from '../api';

class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChangeUsername = async event => {
        const username = event.target.value;
        this.setState({username});
    }

    handleChangePassword = async event => {
        const password = event.target.value;
        this.setState({password});
    }

    handleSubmit = async event => {
        const { username, password } = this.state;
        const data = { username, password };
        await api.loginUser(data).then(res => {
            if(res.status === 200){
                history.push('/gallery');
            } else{
                alert('There was a problem with login');
            }
        });
    }

    render() {
        const { username, password } = this.state;
        return(
            <div className="login-cont">
                <div className="header">
                    <div className="title logo">Dear Diary</div>
                    <div className="subtitle note">Sorry you need to type this one</div>
                </div>
                <form>
                    <input type="text" name="username" placeholder="USERNAME" value={username} onChange={this.handleChangeUsername}></input>
                    <input type="password" name="password" placeholder="PASSWORD" value={password} onChange={this.handleChangePassword}></input>
                </form>
                <div className="footer">
                <button className="get-started-btn ui button" type="button" onClick={this.handleSubmit}>Sign In</button>
                    <p className="note">Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
            </div>
        );
    }
}
export default Login;