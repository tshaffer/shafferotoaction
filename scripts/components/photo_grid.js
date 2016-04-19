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
                <li className="flex-item photoThumbsDiv" key={photo.dbId} >
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height} />
                </li>
            );
        });

        return (
            <div className="photosDiv">
                <ul className="flex-container wrap">
                    {photoNodes}
                </ul>
            </div>
        );
    }
}

export default PhotoGrid;