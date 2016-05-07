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
            // selectedPhoto: {}
            selectedPhotos: {}
        };
        this.photosById = {};
    }

    componentDidMount() {
        console.log("photo-grid: componentDidMount invoked");
    }

    togglePhotoSelection(photo) {
        console.log("togglePhotoSelection");

        let selectedPhotos = this.state.selectedPhotos;
        if (selectedPhotos.hasOwnProperty(photo.dbId)) {
            delete selectedPhotos[photo.dbId];
        }
        else {
            selectedPhotos[photo.dbId] = photo;
        }
        // this.setState({selectedPhotos: selectedPhotos});
    }

    getDayOfPhotoNodes(dayOfPhotos) {

        var self = this;

        let photosForDayNodes = dayOfPhotos.photos.map(function(photo) {

            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;

            return (
                <li className="flex-item photoThumbsDiv thumbLi" key={photo.dbId}>
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height}
                         onClick={() => self.props.selectPhoto(photo)}
                    />
                    <input id={photo.dbId} type="checkbox" className="thumbSelector"
                           onClick={() => self.togglePhotoSelection(photo)}>
                    </input>
                </li>
            );
        });
        
        return photosForDayNodes;
    }

    comparePhotosByDateTaken(photo1, photo2) {
        return Date.compare(new Date(photo1.dateTaken), new Date(photo2.dateTaken)) * -1;
    }

    getMonthLabel(date) {
        let monthLabel = "";
        switch (date.getMonth()) {
            case 0:
                monthLabel = "Jan";
                break;
            case 1:
                monthLabel = "Feb";
                break;
            case 2:
                monthLabel = "Mar";
                break;
            case 3:
                monthLabel = "Apr";
                break;
            case 4:
                monthLabel = "May";
                break;
            case 5:
                monthLabel = "Jun";
                break;
            case 6:
                monthLabel = "Jul";
                break;
            case 7:
                monthLabel = "Aug";
                break;
            case 8:
                monthLabel = "Sep";
                break;
            case 9:
                monthLabel = "Oct";
                break;
            case 10:
                monthLabel = "Nov";
                break;
            case 11:
                monthLabel = "Dec";
                break;
        }

        return monthLabel;
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

        photosFromReducer.sort(this.comparePhotosByDateTaken);

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
            let formattedDateTime = self.getMonthLabel(dayOfPhotos.dateTaken) + " " + dayOfPhotos.dateTaken.toString("dd, yyyy");
            // let formattedDateTime = dayOfPhotos.dateTaken.toString("yyyy-MM-dd");
            return (
                <div className="dayOfPhotosDiv" key={Math.random().toString()}>
                    <p className="dayOfPhotosLabel">{formattedDateTime}</p>
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
