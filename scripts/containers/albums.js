/**
 * Created by tedshaffer on 5/7/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {createAlbum} from '../index';
import {updateAlbums} from '../actions/index';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            albums: []
        };
    }

    componentDidMount() {
        console.log("albums componentDidMount invoked");
        
        // retrieve albums from db
        this.getAlbums();
    }

    getAlbums() {
        this.albums = [];
        this.albumsByName = {};

        const url = "http://localhost:3000/";
        const getAlbumsUrl = url + "getAlbums";

        var self = this;

        $.get({
            url: getAlbumsUrl,
            success: function(result) {
                console.log("getAlbums successful");
                result.Albums.forEach(function(album, index){
                    self.albums.push(album);
                    self.albumsByName[album.name] = album;
                });
                this.setState({albums: self.albums});
                this.props.updateAlbums(self.state.albums);
                if (self.state.albums.length > 0) {
                    this.selectedAlbum = self.state.albums[0];
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving albums in getAlbums");
                console.error(getAlbumsUrl, status, err.toString());
            }.bind(this)
        });
    }
    
    createAlbum() {
        var albumName = this.state.albumName;
        console.log("addAlbum", albumName);
        this.props.onCreateAlbum(albumName);
    }

    onAlbumSelected(event) {
        console.log("onAlbumSelected invoked");
        const selectedAlbumName = event.target.value;
        this.selectedAlbum = this.albumsByName[selectedAlbumName];
        console.log("this.selectedAlbum = " + this.selectedAlbum.name);
    }

    render() {

        let selectOptions = this.state.albums.map(function(album, index) {
            return (
                <option value={album.name} key={album.id}>{album.name}</option>
            );
        });

        let albumsDiv = <div></div>;
        if (this.state.albums.length > 0) {
            albumsDiv =
                <div>
                    <select defaultValue={this.state.albums[0].name} id="albums" onChange={this.onAlbumSelected.bind(this)}>{selectOptions}</select>
                </div>
        }

        let selectedPhotosCount = 0;
        if (this.props.selectedPhotos != undefined) {
            // debugger;
            selectedPhotosCount = Object.keys(this.props.selectedPhotos).length;
            console.log("selected photos is now defined", selectedPhotosCount);
        }

        const divStyle = {
            margin: '5px'
        };

        return (

            <div>
                <h4>Albums</h4>

                <div style={divStyle}>
                    <input
                        value={this.state.albumName}
                        onChange={event => this.setState( { albumName: event.target.value} ) }/>
                    <button onClick={this.createAlbum.bind(this)}>Create Album</button>
                </div>

                {albumsDiv}

                <p>number of selected photos is: {selectedPhotosCount}</p>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        albums: state.albums
        // albums: state.albums,
        // selectedPhotos: state.selectedPhotos
    };
}


function mapDispatchToProps(dispatch) {
    // it's not clear to me what these parameters correspond to
    // return bindActionCreators({createAlbum: createAlbum}, dispatch);
    return bindActionCreators({updateAlbums: updateAlbums}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
