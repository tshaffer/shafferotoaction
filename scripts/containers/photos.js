/**
 * Created by tedshaffer on 5/2/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePhotos } from '../actions/index';
import { queryPhotos } from '../actions/index';

// import { fetchPhotos } from '../actions/index';
import { bindActionCreators } from 'redux';

import PhotoGrid from '../containers/photo-grid';
import PhotoDetail from '../containers/photo_detail';

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
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

    componentDidMount() {
        console.log("photos.js::componentDidMount invoked");

        // // $scope.photoPageContainerHeight = window.innerHeight - 100;
        window.addEventListener('resize', this.handleResize.bind(this));
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});

    }

    queryPhotos (querySpec) {

        let queryStr = JSON.stringify(querySpec);
        let query = { querySpec: queryStr };

        this.props.queryPhotos(query);
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

    render () {

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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ queryPhotos: queryPhotos, updatePhotos: updatePhotos }, dispatch);
}

export default connect(null, mapDispatchToProps)(Photos);
