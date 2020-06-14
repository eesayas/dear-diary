import React, { Component } from 'react';
import api from '../api';
import auth from '../auth';
import '../styling/Gallery.css';
import history from "../history";
import moment from 'moment';

class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount = async() => {
        await api.fetchPosts(auth.user).then(data => {
            let posts = data.data.data; //this is all the posts of user
            this.setState({
                posts: posts
            });
        }).catch(err => {
            alert('There has been an error in fetching posts');
        });
    }

    render() {
        const { posts } = this.state;
        const listItems = posts.reverse().map((item) =>
            <div className="post-content">
                <div className="previews-cont">
                    <div className="preview-title">{ (item.title.length > 30) ? item.title.substring(0, 30) + '...' :  item.title }</div>
                    <div className="preview-subtitle">{ (item.body.length > 30) ? item.body.substring(0, 30) + '...' :  item.body }</div>
                </div>
                <div className="timestamp">
                    {moment(item.updatedAt).format('MMMM D YYYY') + ' at ' + moment(item.updatedAt).format('h:mma')}
                </div>
            </div>
        );
        
        return (
            <div className="gallery-cont">
                <div className="gallery-header">
                    <div className="logo header-logo">Dear Diary</div>
                    <div className="user-actions">
                        <button className="ui button sign-out-btn">SIGN OUT</button>
                    </div>
                </div>
                <div className="posts-cont">
                    {listItems}
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