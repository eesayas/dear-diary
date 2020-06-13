import React, { Component } from 'react';

class Compose extends Component {
    state = {}
    render() {
        return (
            <div>
                <p>compose</p>
                <p id="interimTitle"></p>
                <p id="title"></p>
                <p id="interimBody"></p>
                <p id="body"></p>
            </div>
        );
    }
}

export default Compose;