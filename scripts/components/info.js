/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

import Metadata from './metadata';

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

        return (
            <Metadata  photoInfo = {this.props.photoInfo}/>
        );
    }
}

export default Info;