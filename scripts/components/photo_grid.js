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
        this.photosById = {};
    }

    componentDidMount() {
        console.log("componentDidMount invoked");
    }

    photoSelected(event) {
        console.log("photo selected");
        this.selectedPhoto = this.photosById[event.target.id];
    }

    render () {

        let self = this;
        var photoNodes = this.props.photoInfo.photos.map(function(photo) {
            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;
            return (
                <li className="flex-item photoThumbsDiv" key={photo.dbId} >
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height} onClick={self.photoSelected.bind(self)} />
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