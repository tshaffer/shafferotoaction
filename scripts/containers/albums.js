/**
 * Created by tedshaffer on 5/7/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createAlbum} from '../index';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {albumName: ''};
    }

    componentDidMount() {
        console.log("albums componentDidMount invoked");
    }

    createAlbum() {
        var albumName = this.state.albumName;
        console.log("addAlbum", albumName);
        this.props.onCreateAlbum(albumName);
    }

    render() {

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
    return bindActionCreators({createAlbum: createAlbum}, dispatch);
}

export default connect(null, mapDispatchToProps)(Albums);
