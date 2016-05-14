/**
 * Created by tedshaffer on 4/20/16.
 */
import React, { Component } from 'react';

class Metadata extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        $(function () { $('#jstree_demo_div').jstree(); });
    }

    componentDidMount() {
        console.log("metadata componentDidMount invoked");
    }

    render () {

        this.selectedPhotoTitle = "none";
        this.selectedPhotoWidth = "";
        this.selectedPhotoHeight = "";
        this.selectedPhotoDateTaken = "";
        if (this.props.selectedPhoto != null) {

            let selectedPhoto = this.props.selectedPhoto;
            this.selectedPhotoTitle = selectedPhoto.title;
            this.selectedPhotoWidth = selectedPhoto.width;
            this.selectedPhotoHeight = selectedPhoto.height;

            let dt = new Date(selectedPhoto.dateTaken);
            this.selectedPhotoDateTaken = dt.toString("M/d/yyyy hh:mm tt");

        }

        // let photoFolder1 = {
        //     text: "photoFolder1"
        // };
        //
        // let photoFolder2 = {
        //     text: "photoFolder2"
        // };
        //
        // let photoFolder3 = {
        //     text: "photoFolder3"
        // };

        // let photoTree =
        //     $('#using_json').jstree({ 'core' : {
        //         'data' : [
        //             'Simple root node',
        //             {
        //                 'text' : 'Root node 2',
        //                 'state' : {
        //                     'opened' : true,
        //                     'selected' : true
        //                 },
        //                 'children' : [
        //                     { 'text' : 'Child 1' },
        //                     'Child 2'
        //                 ]
        //             }
        //         ]
        //     } })
        // let photoTree =
        //     <ul>
        //         <li>Root node 1
        //             <ul>
        //                 <li id="child_node_1">Child node 1</li>
        //                 <li>Child node 2</li>
        //             </ul>
        //         </li>
        //         <li>Root node 2</li>
        //     </ul>

        // let photoTree =
        //     $('#jstree_demo_div').jstree({ 'core' : {
        //         'data' : [
        //             'Simple root node pizza',
        //             {
        //                 'text' : 'Root node 2',
        //                 'state' : {
        //                     'opened' : true,
        //                     'selected' : true
        //                 },
        //                 'children' : [
        //                     { 'text' : 'Child 1' },
        //                     'Child 2'
        //                 ]
        //             }
        //         ]
        //     }})

        //
        // let photoTree =
        //     $('#jstree_demo_div').jstree({ 'core' : photoData
        //     })


        // <div id="jstree_demo_div">
        //     {photoTree}
        // </div>

        // let photoData = { 'data': ['Simple root node pizza']};
        let photoData = { 'data' : [
            'Simple root node pizza',
            {
                'text' : 'Root node 2',
                'state' : {
                    'opened' : true,
                    'selected' : true
                },
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            }
        ]}

        $('#jstree_demo_div').jstree({ 'core' : photoData })

        return (
            <div>
                <div id="jstree_demo_div">
                </div>

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

export default Metadata;