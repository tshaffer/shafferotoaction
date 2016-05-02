/**
 * Created by tedshaffer on 5/1/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Metadata from '../components/metadata';
import PhotoSearch from './photo-search';

class PhotoDetail extends Component {

    render () {

        console.log("eat pizza");

        return (
            <div>
                <Metadata selectedPhoto = {this.props.photo}/>
                <PhotoSearch onQueryPhotos={this.props.onQueryPhotos} selectedPhoto = {this.props.photo}/>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        photo: state.activePhoto
    };
}

export default connect(mapStateToProps)(PhotoDetail);
