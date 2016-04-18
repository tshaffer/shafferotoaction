/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

class PhotoGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("componentDidMount invoked");
    }

    render () {
        return (
            <div>
                <h1>Hello, shafferotoaction!</h1>
            </div>
        );
    }
}

export default PhotoGrid;