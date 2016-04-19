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

        let self = this;
        var photoNodes = this.props.photoInfo.photos.map(function(photo) {
            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            return (
                <li className="flex-item photoThumbsDiv" key={photo.id} >
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width="100"
                         height="100" />
                </li>
            );
        });

        return (
            <ul className="flex-container wrap">
                <div className="photosDiv">
                    {photoNodes}
                </div>
            </ul>
        );
    }
}

export default PhotoGrid;