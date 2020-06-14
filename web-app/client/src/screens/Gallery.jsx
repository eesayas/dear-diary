import React, { Component } from 'react';
import api from '../api';
import auth from '../auth';
import '../styling/Gallery.css';
import history from "../history";

class Gallery extends Component {
    componentDidMount = async() => {
        await api.fetchPosts(auth.user).then(data => {
            let posts = data.data.data; //this is all the posts of user
        }).catch(err => {
            alert('There has been an error in fetching posts');
        });
    }

    render() {
        return (
            <div className="gallery-cont">
                <div className="gallery-header">
                    <div className="logo header-logo">Dear Diary</div>
                    <div className="user-actions">
                        <button className="ui button sign-out-btn">SIGN OUT</button>
                    </div>
                </div>
                <div className="posts-cont">
                    <div className="post-content">
                        <div className="previews-cont">
                            <div className="preview-title">I don't know what...</div>
                            <div className="preview-subtitle">Whatever, same old same old...</div>
                        </div>
                        <div className="timestamp">
                            June 11 2020 at 3:45pm
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="previews-cont">
                            <div className="preview-title">I don't know what...</div>
                            <div className="preview-subtitle">Whatever, same old same old...</div>
                        </div>
                        <div className="timestamp">
                            June 11 2020 at 3:45pm
                        </div>
                    </div>

                    <div className="post-content">
                        <div className="previews-cont">
                            <div className="preview-title">I don't know what...</div>
                            <div className="preview-subtitle">Whatever, same old same old...</div>
                        </div>
                        <div className="timestamp">
                            June 11 2020 at 3:45pm
                        </div>
                    </div>

                    <div className="post-content">
                        <div className="previews-cont">
                            <div className="preview-title">I don't know what...</div>
                            <div className="preview-subtitle">Whatever, same old same old...</div>
                        </div>
                        <div className="timestamp">
                            June 11 2020 at 3:45pm
                        </div>
                    </div>
                </div>
                <div className="gallery-footer">
                    <button className="ui button get-started-btn" onClick={() => history.push("/compose")}>+ COMPOSE</button>
                    <div>Say ‘Dear Diary, Compose’ to create a diary log</div>
                </div>
            </div>
        );
    }
}

export default Gallery;