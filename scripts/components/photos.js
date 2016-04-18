/**
 * Created by tedshaffer on 4/18/16.
 */
import React, { Component } from 'react';

import Info from './info';

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("componentDidMount invoked");
    }

    render () {
        return (
            <div className = "shafferotoContainer">
                <h1>Hello, shafferotoaction!</h1>
                <Info />
            </div>
            // <div>
                // <h4>Metadata</h4>
                //
                // <div className="photoMetadata">
                //
                //     <div>
                //         <span className="leftColumn smallFont">Name:</span>
                //         <span className="rightColumn smallFont">{this.state.selectedPhoto.title}</span>
                //     </div>
                //
                //     <div>
                //         <span className="leftColumn smallFont">Dimensions:</span>
                //     </div>
                //
                //     <div>
                //         <span className="leftColumn smallFont">Date taken:</span>
                //     </div>
                // </div>
            // </div>
        );
    }
}

export default Photos;