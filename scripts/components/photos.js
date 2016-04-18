/**
 * Created by tedshaffer on 4/18/16.
 */
import React, { Component } from 'react';

import Info from './info';
import PhotoGrid from './photo_grid';

class Photos extends Component {

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
                <div className="photosDiv">
                    <PhotoGrid />
                </div>
                
                <div className="metadata">
                    <Info />
                </div>
            </div>
        );
    }
}

export default Photos;