/**
 * Created by tedshaffer on 4/17/16.
 */
import React, { Component } from 'react';

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
        console.log("componentDidMount invoked");
    }

    render () {

        console.log("info.js::render");
        this.selectedPhotoTitle = "none";
        if (this.props.photoInfo.photos.length > 0) {
            this.selectedPhotoTitle = this.props.photoInfo.photos[0].title;
        }
        return (
            <div>
                <h4>Metadata</h4>

                <div className="photoMetadata">

                    <div>
                        <span className="leftColumn smallFont">Name:</span>
                        <span className="rightColumn smallFont">{this.selectedPhotoTitle}</span>
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