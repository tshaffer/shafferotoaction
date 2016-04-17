/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

class Info extends Component {

    componentDidMount() {
        console.log("componentDidMount invoked");

        const url = "http://localhost:3000/";
        const getPhotosUrl = url + "getPhotos";

        $.get({
            url: getPhotosUrl,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log("photos successfully retrieved");
                console.log("number of photos is: " + data.photos.length.toString());
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving photos");
                console.error(getPhotosUrl, status, err.toString());
            }.bind(this)
        });

    }

    render () {
        return (
            <div>
                <h4>Metadata</h4>

                <div className="photoMetadata">

                    <div>
                        <span className="leftColumn smallFont">Name:</span>
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
}

export default Info;