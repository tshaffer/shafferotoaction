/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

class PhotoGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selectedPhoto: {}
        };
    }

    componentDidMount() {
        console.log("componentDidMount invoked");
    }

    render () {
        var photoInfo = this.props.photoInfo;

        return (
            <div>
                <h1>Hello, shafferotoaction!</h1>
            </div>
        );
    }
}

export default PhotoGrid;