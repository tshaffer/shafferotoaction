/**
 * Created by tedshaffer on 5/1/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPhoto } from '../actions/index';
import { updatePhotos } from '../actions/index';
import { bindActionCreators } from 'redux';

class PhotoGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // photos: [],
            selectedPhoto: {}
        };
        this.photosById = {};
    }

    componentDidMount() {
        console.log("photo-grid: componentDidMount invoked");
    }
    
    render() {

        let self = this;

        let lastYear = -1;
        let lastMonth = -1;
        let lastDate = -1;

        let photosFromReducer = this.props.photos || [];

        // need an array of items where each item in the array is
        // - <p> with the date, followed by a
        // - <ul> with some number of photo <li> objects

        let daysOfPhotos = [];
        let dayOfPhotos = {};

        photosFromReducer.map(function(photo) {

            let dateTaken = photo.dateTaken;
            let dt = new Date(dateTaken);

            if (dt.getYear() != lastYear || dt.getMonth() != lastMonth || dt.getDate() != lastDate) {

                lastYear = dt.getYear();
                lastMonth = dt.getMonth();
                lastDate = dt.getDate();

                if (!(dayOfPhotos.photos == undefined)) {
                    daysOfPhotos.push(dayOfPhotos);
                }

                dayOfPhotos = {};
                dayOfPhotos.dateTaken = dt;
                dayOfPhotos.photos = [];
            }
            dayOfPhotos.photos.push(photo);
        });

        // TODO push last day of photos onto array if necessary

        let photoNodes = photosFromReducer.map(function(photo) {

            self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.photosById[photo.dbId] = photo;
            
            return (
                <li
                    className="flex-item photoThumbsDiv"
                    key={photo.dbId}
                >
                    <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                         height={photo.height}
                         onClick={() => self.props.selectPhoto(photo)}
                    />
                </li>
            );
        });

        // <div className="photosDiv">
        //     <ul className="flex-container wrap">
        //         {photoNodes}
        //     </ul>
        // </div>

        return (
            <div className="photosDiv">
                <p>5/4/2016</p>
                <ul className="flex-container wrap" >
                    <li className="flex-item photoThumbsDiv" key="1">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="2">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="3">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="4">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="5">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="6">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="7">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="11">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="12">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="13">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="14">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="15">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="16">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="17">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="21">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="22">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="23">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="24">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="25">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="26">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                    <li className="flex-item photoThumbsDiv" key="27">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%201_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                </ul>

                <p>4/4/2015</p>
                <ul className="flex-container wrap">
                    <li className="flex-item photoThumbsDiv" key="100">
                        <img src="http://localhost:3000/photos/testPhotos/Tahoe/photo%20(8)_thumb.JPG" className="thumbImg" width="150"
                             height="150"
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

// Anything returned from this function will end up as props on the PhotoGrid container
function mapDispatchToProps(dispatch) {
    // Whenever selectPhoto is called, the result should be passed to all of our reducers
    return bindActionCreators({ selectPhoto: selectPhoto }, dispatch);
}

export default connect(null, mapDispatchToProps)(PhotoGrid);
