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

        this.selectedPhotoTitle = "none";
        this.selectedPhotoWidth = "";
        this.selectedPhotoHeight = "";
        this.selectedPhotoDateTaken = "";
        if (this.props.photoInfo.photos.length > 0) {
            var selectedPhoto = this.props.photoInfo.photos[0];
            this.selectedPhotoTitle = selectedPhoto.title;
            this.selectedPhotoWidth = selectedPhoto.width;
            this.selectedPhotoHeight = selectedPhoto.height;
            this.selectedPhotoDateTaken = selectedPhoto.dateTaken;
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
                        <span className="rightColumn smallFont">{this.selectedPhotoWidth}x{this.selectedPhotoHeight}</span>
                    </div>

                    <div>
                        <span className="leftColumn smallFont">Date taken:</span>
                        <span className="rightColumn smallFont">{this.selectedPhotoDateTaken}</span>
                    </div>
                </div>

            </div>
        );
    }
}

export default Info;