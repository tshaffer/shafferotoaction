/**
 * Created by tedshaffer on 5/2/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePhotos } from '../actions/index';
// import { fetchPhotos } from '../actions/index';
import { bindActionCreators } from 'redux';

import PhotoGrid from '../containers/photo-grid';
import PhotoDetail from '../containers/photo_detail';

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selectedPhoto: null,
            divStyle: {}
        };
    }

    handleResize(e) {
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // componentWillMount() {
    //     console.log("photos: componentWillMount invoked");
    //     this.props.fetchPhotos();
    // }
    //
    componentDidMount() {
        console.log("photos.js::componentDidMount invoked");

        // // $scope.photoPageContainerHeight = window.innerHeight - 100;
        window.addEventListener('resize', this.handleResize.bind(this));
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});

        // const url = "http://localhost:3000/";
        // const getPhotosUrl = url + "getPhotos";
        //
        // $.get({
        //     url: getPhotosUrl,
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {
        //         console.log("number of photos retrieved is: " + data.photos.length.toString());
        //         this.updatePhotos(data.photos);
        //         this.props.updatePhotos(this.state.photos);
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.log("errors retrieving photos");
        //         console.error(getPhotosUrl, status, err.toString());
        //     }.bind(this)
        // });

    }

    // updatePhotos(newDBPhotos) {
    //
    //     var self = this;
    //
    //     let photos = [];
    //
    //     newDBPhotos.forEach(function(dbPhoto){
    //
    //         let photo = self.getPhotoFromDBPhoto(dbPhoto);
    //         photos.push(photo);
    //     });
    //
    //     if (photos.length > 0) {
    //         this.setState({photos: photos});
    //         this.setState({selectedPhoto: photos[0]});
    //     }
    // }

    queryPhotos (querySpec) {

        debugger;

        // const url = "http://localhost:3000/";
        // const queryPhotosUrl = url + "queryPhotos";
        //
        // // TODO - passing the object would have worked except the server code is expecting a string, so the following nonsense was done for backwards compatibility
        // // let query = { querySpec: querySpec };
        // let queryStr = JSON.stringify(querySpec);
        // let query = { querySpec: queryStr };
        //
        // $.get({
        //     url: queryPhotosUrl,
        //     data: query,
        //     success: function(data) {
        //         console.log("queryPhotos: number of photos retrieved is: " + data.photos.length.toString());
        //         this.updatePhotos(data.photos);
        //         this.props.updatePhotos(this.state.photos);
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.log("errors retrieving photos in queryPhotos");
        //         console.error(getPhotosUrl, status, err.toString());
        //     }.bind(this)
        // });
    }

    handleCreateAlbum(albumName) {
        console.log("handleCreateAlbum invoked");
        console.log("albumName", albumName);

        const url = "http://localhost:3000/";
        const createAlbumUrl = url + "createAlbum";

        const query = { albumName: albumName };

        return new Promise(function (resolve, reject) {
            $.get({
                url: createAlbumUrl,
                data: query,
                success: function(data) {
                    console.log("handleCreateAlbum: success");
                    // const albumId = data.albumId;
                    resolve(data);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("error creating album in handleCreateAlbum");
                    reject();
                }.bind(this)
            });
        });
    }

    handleQueryPhotos(querySpec) {
        console.log("handleQueryPhotos invoked");
        console.log("querySpec=" + querySpec);
        this.queryPhotos(querySpec);
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

        photo.height = 220;
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

    render () {

        var self = this;
        var photosFromDB = [];

        // if (this.props.photos && this.props.photos.length > 0 && this.state.photos.length == 0) {
        //     this.props.photos.forEach(function(dbPhoto, index) {
        //         let photo = self.getPhotoFromDBPhoto(dbPhoto);
        //         photosFromDB.push(photo);
        //     });
        //
        //     this.setState({ photos: photosFromDB });
        //
        //     // if (photos.length > 0) {
        //     //     this.setState({selectedPhoto: photos[0]});
        //     // }
        // }

        // <PhotoGrid photos = {this.props.photos}/>

        return (
            <div className="photoPageContainer" style={this.state.divStyle}>
                <div className="photosDiv">
                    <PhotoGrid/>
                </div>

                <div className="metadata">
                    <PhotoDetail 
                        onCreateAlbum={this.handleCreateAlbum.bind(this)} 
                        onQueryPhotos={this.handleQueryPhotos.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     // Whatever is returned will show up as props inside of PhotoGrid
//     return {
//         photos: state.photos
//     };
// }
//
// Anything returned from this function will end up as props on the PhotoGrid container
function mapDispatchToProps(dispatch) {
    // Whenever selectPhoto is called, the result should be passed to all of our reducers
    return bindActionCreators({ updatePhotos: updatePhotos }, dispatch);
}

// export default connect(mapStateToProps, mapDispatchToProps)(Photos);
export default connect(null, mapDispatchToProps)(Photos);
