/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

let Info = React.createClass({

// class Info extends Component {

    getInitialState () {
        return {
            photos: [],
            selectedPhoto: {}
        };
    },

    componentDidMount() {
        console.log("componentDidMount invoked");

        const url = "http://localhost:3000/";
        const getPhotosUrl = url + "getPhotos";

        $.get({
            url: getPhotosUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("number of photos retrieved is: " + data.photos.length.toString());
                this.setState({photos: data.photos});
                this.setState({selectedPhoto: data.photos[1]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });
    },

    render () {
        return (
            <div>
                <h4>Metadata</h4>

                <div className="photoMetadata">

                    <div>
                        <span className="leftColumn smallFont">Name:</span>
                        <span className="rightColumn smallFont">{this.state.selectedPhoto.title}</span>
                    </div>

                    <div>
                        <span className="leftColumn smallFont">Dimensions:</span>
                    </div>

                    <div>
                        <span className="leftColumn smallFont">Date taken:</span>
                    </div>
                </div>

            </div>
        );
    }
})

export default Info;