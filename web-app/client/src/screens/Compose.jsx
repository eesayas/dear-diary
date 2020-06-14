import React, { Component } from 'react';
import history from "../history";
import "../styling/compose.css";
import api from '../api';
import auth from '../auth';
import Cookies from 'universal-cookie';

class Compose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleBodyChange(event) {
        this.setState({ body: event.target.value});
    }
    
    //this will handle the submission
    handleSubmission = async event => {
        
        const { title, body } = this.state;
        const userId = auth.user;

        const data = {title, body, userId};

        await api.createPost(data).then(res => {
            console.log(res.status);
            if(res.status === 200){
                history.push('/gallery');
            }
        });
    }

    render() {
        return (
            <div className="compose-overall">
                <div className="gallery-header">
                    <div className="logo header-logo">Dear Diary</div>
                    <div className="user-actions">
                        <button className="ui button sign-out-btn" 
                            onClick={() => {
                                auth.logout(() => {
                                    const cookies = new Cookies();
                                    cookies.remove('deardiary');
                                    history.push("/login");
                                });
                            }}
                        >SIGN OUT</button>
                    </div>
                </div>
                <div className="compose-body">
                    <form className="form">
                        <textarea value={this.state.titleValue} onChange={this.handleTitleChange} id="title" placeholder='Say "Dear Diary, Title" to make your title...' />
                        <textarea value={this.state.bodyValue} onChange={this.handleBodyChange} id="body" placeholder='Say "Dear Diary, Body" to make your title...' />
                        <div className="foot">
                            <p>Say “Dear Diary, Publish” or “Dear Diary, Cancel”</p>
                            <div className="button-group">
                                <button className="publish-button" type="button" onClick={this.handleSubmission}>PUBLISH</button>
                                <button className="cancel-button" type="button" onClick={() => history.push("/gallery")}>CANCEL</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Compose;