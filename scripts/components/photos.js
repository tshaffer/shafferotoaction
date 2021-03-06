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
            selectedPhoto: null,
            divStyle: {}
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

        if (photos.length > 0) {
            this.setState({photos: photos});
            this.setState({selectedPhoto: photos[0]});
        }
    }

    handleResize(e) {
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleSelectPhoto(photo) {
        console.log("handleSelectPhoto invoked");
        this.setState({selectedPhoto: photo});
    }

    handleQueryPhotos(querySpec) {
        console.log("handleQueryPhotos invoked");
        console.log("querySpec=" + querySpec);
        this.queryPhotos(querySpec);
    }
    
    componentDidMount() {
        console.log("componentDidMount invoked");

        // // $scope.photoPageContainerHeight = window.innerHeight - 100;
        window.addEventListener('resize', this.handleResize.bind(this));
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});

        const url = "http://localhost:3000/";
        const getPhotosUrl = url + "getPhotos";

        $.get({
            url: getPhotosUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("number of photos retrieved is: " + data.photos.length.toString());
                this.updatePhotos(data.photos);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }

    queryPhotos (querySpec) {

        const url = "http://localhost:3000/";
        const queryPhotosUrl = url + "queryPhotos";

        // TODO - passing the object would have worked except the server code is expecting a string, so the following nonsense was done for backwards compatibility
        // let query = { querySpec: querySpec };
        let queryStr = JSON.stringify(querySpec);
        let query = { querySpec: queryStr };
        
        $.get({
            url: queryPhotosUrl,
            data: query,
            success: function(data) {
                console.log("queryPhotos: number of photos retrieved is: " + data.photos.length.toString());
                this.updatePhotos(data.photos);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos in queryPhotos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    }


    render () {
        // <div className="photoPageContainer" style={{height: window.innerHeight - 100}}>
        // <div className="photoPageContainer" style={this.state.divStyle}>
        // let divStyle = {
        //     height: window.innerHeight - 100
        // };
        return (
            <div className="photoPageContainer" style={this.state.divStyle}>
                <div className="photosDiv">
                    <PhotoGrid onSelectPhoto={this.handleSelectPhoto.bind(this)} photoInfo = {this.state}/>
                </div>
                
                <div className="metadata">
                    <Info onQueryPhotos={this.handleQueryPhotos.bind(this)} photoInfo = {this.state}/>
                </div>
            </div>
        );
    }
}

export default Photos;