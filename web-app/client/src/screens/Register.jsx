import React, { Component } from 'react';
import "../styling/Login.css"
import api from '../api';
import history from "../history";

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChangeUsername = async event => {
        const username = event.target.value;
        this.setState({username});
    }

    handleChangeEmail = async event => {
        const email = event.target.value;
        this.setState({email});
    }

    handleChangePassword = async event => {
        const password = event.target.value;
        this.setState({password});
    }

    handleSubmit = async event => {
        const { username, email, password } = this.state;
        const data = { username, email, password };
        await api.registerUser(data).then(res => {
            if(res.status === 200){
                history.push('/gallery');
            } else{
                alert('There was a problem with registration');
            }
        });
    }

    render() {
        return(
            <div className="login-cont">
                <div className="header">
                    <div className="title logo">Dear Diary</div>
                    <div className="subtitle note">Sorry you need to type this one</div>
                </div>
                <form>
                    <input type="text" name="username" placeholder="USERNAME" onChange={this.handleChangeUsername}></input>
                    <input type="text" name="username" placeholder="EMAIL" onChange={this.handleChangeEmail}></input>
                    <input type="password" name="password" placeholder="PASSWORD" onChange={this.handleChangePassword}></input>
                </form>
                <div className="footer">
                <button className="get-started-btn ui button" type="button" onClick={this.handleSubmit}>Sign Up</button>
                    <p className="note">Already have an account? <a href="/login">Sign In</a></p>
                </div>
            </div>
        );
    }
}

export default Register;