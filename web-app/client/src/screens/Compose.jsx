import React, { Component } from 'react';
import history from "../history";
import "../styling/compose.css";

class Compose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleValue: "",
            bodyValue: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ titleValue: event.target.titleValue });
        this.setState({ bodyValue: event.target.bodyValue });
    }

    render() {
        return (
            <div>
                <form>
                    <textarea value={this.state.titleValue} onChange={this.handleChange} id="title" placeholder="title" />
                    <textarea value={this.state.bodyValue} onChange={this.handleChange} id="body" placeholder="body" />
                </form>
                <button className="button" type="button">PUBLISH</button>
                <button className="button" type="button" onClick={() => history.push("/gallery")}>CANCEL</button>
            </div>
        );
    }
}

export default Compose;