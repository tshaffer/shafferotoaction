/**
 * Created by tedshaffer on 5/7/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAlbum } from '../index';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("albums componentDidMount invoked");
    }

    createAlbum() {
        console.log("addAlbum");
        var albumName = "album1";
        this.props.onCreateAlbum(albumName);
    }

    render() {
        return (
            <div>
                <button onClick={this.createAlbum.bind(this)}>Create Album</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // tags: state.tags
    };
}


function mapDispatchToProps(dispatch) {
    // it's not clear to me what these parameters correspond to
    return bindActionCreators({ createAlbum: createAlbum }, dispatch);
}

export default connect(null, mapDispatchToProps)(Albums);
