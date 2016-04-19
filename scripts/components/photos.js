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

        this.setState({photos: photos});
        this.setState({selectedPhoto: photos[0]});
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
                // this.setState({photos: data.photos});
                // this.setState({selectedPhoto: data.photos[0]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }

    render () {
        return (
            <div className="photoPageContainer">
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