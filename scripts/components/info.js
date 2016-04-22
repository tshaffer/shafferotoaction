/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

import Metadata from './metadata';
import Search from './search';

// const Info = React.createClass({

class Info extends Component {

    // getInitialState () {
    //     return {
    //         photos: [],
    //         selectedPhoto: {}
    //     };
    // },

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("infocomponentDidMount invoked");
    }

    render () {

        console.log("eat pizza");

        return (
            <div>
                <Metadata  photoInfo = {this.props.photoInfo}/>
                <Search onQueryPhotos={this.props.onQueryPhotos} photoInfo = {this.props.photoInfo}/>
            </div>
        );
    }
}

export default Info;