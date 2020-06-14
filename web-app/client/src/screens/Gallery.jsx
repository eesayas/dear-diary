import React, { Component } from 'react';
import api from '../api';
import auth from '../auth';

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
                    <div>Dear Diary</div>
                    <div>
                        <div>Hello, eesayas</div>
                        <button>SIGN OUT</button>
                    </div>
                </div>
                <div className="posts-cont">
                    <div className="post-content">
                        <div className="previews-cont">
                            <div className="preview-title"></div>
                            <div className="preview-subtitle"></div>
                        </div>
                        <div className="timestamp">
                            
                        </div>
                    </div>
                </div>
                <div className="gallery-footer">
                    <button>COMPOSE</button>
                    <div>Say ‘Hey Diary, Compose’ to create a diary log</div>
                </div>
            </div>
        );
    }
}

export default Gallery;