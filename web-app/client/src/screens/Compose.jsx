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
                <div className="compose-body">
                    <form className="form">
                        <textarea value={this.state.titleValue} onChange={this.handleChange} id="title" placeholder='Say "Dear Diary, Title" to make your title...' />
                        <textarea value={this.state.bodyValue} onChange={this.handleChange} id="body" placeholder='Say "Dear Diary, Body" to make your body...' />
                        <div className="foot">
                            <p>Say “Dear Diary, Publish” or “Dear Diary, Cancel”</p>
                            <div className="button-group">
                                <button className="publish-button" type="button">PUBLISH</button>
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