/**
 * Created by tedshaffer on 4/18/16.
 */
import React, { Component } from 'react';

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

        return (
            <div className="photoPageContainer" style={this.state.divStyle}>
                <div className="photosDiv">
                    <PhotoGrid/>
                </div>

                <div className="metadata">
                    <PhotoDetail onQueryPhotos={this.handleQueryPhotos.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default Photos;