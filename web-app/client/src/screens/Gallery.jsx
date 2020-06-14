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
            <div>
                <p>gallery</p>
            </div>
        );
    }
}

export default Gallery;