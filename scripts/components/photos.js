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
            photos: [],
            selectedPhoto: {}
        };
    }

    componentDidMount() {
        console.log("componentDidMount invoked");

        const url = "http://localhost:3000/";
        const getPhotosUrl = url + "getPhotos";

        $.get({
            url: getPhotosUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("number of photos retrieved is: " + data.photos.length.toString());
                this.setState({photos: data.photos});
                this.setState({selectedPhoto: data.photos[0]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }

    render () {
        return (
            <div>
                <div className="photosDiv">
                    <PhotoGrid photoInfo = {this.state}/>
                </div>
                
                <div className="metadata">
                    <Info photoInfo = {this.state}/>
                </div>
            </div>
        );
    }
}

export default Photos;