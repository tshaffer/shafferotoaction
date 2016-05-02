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
            photos: [],
            selectedPhoto: {}
        };
        this.photosById = {};
    }

    getPhotoFromDBPhoto (dbPhoto) {

        let photo = {};

        photo.dbId = dbPhoto.id;
        photo.url = dbPhoto.url;
        photo.thumbUrl = dbPhoto.thumbUrl;
        photo.orientation = dbPhoto.orientation;
        photo.title = dbPhoto.title;

        let width = dbPhoto.width;
        let height = dbPhoto.height;

        let ratio = null;
        if (photo.orientation == 6) {
            ratio = height / width;
        }
        else {
            ratio = width / height;
        }

        photo.height = 108;
        photo.width = ratio * photo.height;

        let dateTaken = dbPhoto.dateTaken;
        let dt = new Date(dateTaken);
        // photo.dateTaken = dt.toString("M/d/yyyy HH:mm");
        photo.dateTaken = dt.toString("M/d/yyyy hh:mm tt");

        photo.tagList = "";
        dbPhoto.tags.forEach(function(tag) {
            photo.tagList += tag + ", ";
        });
        photo.tagList = photo.tagList.substring(0, photo.tagList.length - 2);

        photo.dbPhoto = dbPhoto;

        return photo;
    }

    updatePhotos(newDBPhotos) {

        var self = this;

        let photos = [];

        newDBPhotos.forEach(function(dbPhoto){

            let photo = self.getPhotoFromDBPhoto(dbPhoto);
            photos.push(photo);
        });

        if (photos.length > 0) {
            this.setState({photos: photos});
            this.setState({selectedPhoto: photos[0]});
        }
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
                this.updatePhotos(data.photos);
                this.props.updatePhotos(this.state.photos);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }
    
    render() {

        let self = this;
        let photosFromReducer = this.props.photos || [];
        let photoNodes = photosFromReducer.map(function(photo) {
            
            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;

            console.log("key is ", photo.dbId);

            return (
                <li
                    className="flex-item photoThumbsDiv"
                    key={photo.dbId}
                >
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height}
                         onClick={() => self.props.selectPhoto(photo)}
                    />
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

function mapStateToProps(state) {
    // Whatever is returned will show up as props inside of PhotoGrid
    return {
        photos: state.photos
    };
}

// Anything returned from this function will end up as props on the PhotoGrid container
function mapDispatchToProps(dispatch) {
    // Whenever selectPhoto is called, the result should be passed to all of our reducers
    return bindActionCreators({ selectPhoto: selectPhoto, updatePhotos: updatePhotos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid);
