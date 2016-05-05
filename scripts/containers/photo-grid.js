/**
 * Created by tedshaffer on 5/1/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPhoto } from '../actions/index';
import { updatePhotos } from '../actions/index';
import { bindActionCreators } from 'redux';

class PhotoGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // photos: [],
            selectedPhoto: {}
        };
        this.photosById = {};
    }

    componentDidMount() {
        console.log("photo-grid: componentDidMount invoked");
    }

    getDayOfPhotoNodes(dayOfPhotos) {

        var self = this;

        let photosForDayNodes = dayOfPhotos.photos.map(function(photo) {

            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;

            return (
                <li className="flex-item photoThumbsDiv" key={photo.dbId}>
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height}
                         onClick={() => self.props.selectPhoto(photo)}
                    />
                </li>
            );
        });
        
        return photosForDayNodes;
    }

    render() {

        let self = this;

        let lastYear = -1;
        let lastMonth = -1;
        let lastDate = -1;

        let photosFromReducer = this.props.photos || [];

        // need an array of items where each item in the array is
        // - <p> with the date, followed by a
        // - <ul> with some number of photo <li> objects

        let daysOfPhotos = [];
        let dayOfPhotos = {};

        photosFromReducer.map(function(photo) {

            let dateTaken = photo.dateTaken;
            let dt = new Date(dateTaken);

            if (dt.getYear() != lastYear || dt.getMonth() != lastMonth || dt.getDate() != lastDate) {

                lastYear = dt.getYear();
                lastMonth = dt.getMonth();
                lastDate = dt.getDate();

                if (!(dayOfPhotos.photos == undefined)) {
                    daysOfPhotos.push(dayOfPhotos);
                }

                dayOfPhotos = {};
                dayOfPhotos.dateTaken = dt;
                dayOfPhotos.photos = [];
            }
            dayOfPhotos.photos.push(photo);
        });

        if (typeof dayOfPhotos.photos == "object" && dayOfPhotos.photos.length > 0) {
            daysOfPhotos.push(dayOfPhotos);
        }

        // let photoNodes = photosFromReducer.map(function(photo) {
        //
        //     self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
        //     self.photosById[photo.dbId] = photo;
        //
        //     return (
        //         <li className="flex-item photoThumbsDiv" key={photo.dbId}>
        //             <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
        //                  height={photo.height}
        //                  onClick={() => self.props.selectPhoto(photo)}
        //             />
        //         </li>
        //     );
        // });

        let daysOfPhotosNodes = daysOfPhotos.map(function(dayOfPhotos) {

            // let formattedDateTime = dayOfPhoto.dateTaken.toString("yyyy-MM-dd hh:mm tt");
            let formattedDateTime = dayOfPhotos.dateTaken.toString("yyyy-MM-dd");
            return (
                <div key={Math.random().toString()}>
                    <p>{formattedDateTime}</p>
                    <ul className="flex-container wrap">
                        {self.getDayOfPhotoNodes(dayOfPhotos)}
                    </ul>
                </div>
            );
        });

        return (
            <div>
                {daysOfPhotosNodes}
            </div>

        );
    }
}

// Anything returned from this function will end up as props on the PhotoGrid container
function mapDispatchToProps(dispatch) {
    // Whenever selectPhoto is called, the result should be passed to all of our reducers
    return bindActionCreators({ selectPhoto: selectPhoto }, dispatch);
}

export default connect(null, mapDispatchToProps)(PhotoGrid);
