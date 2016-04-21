/**
 * Created by tedshaffer on 4/20/16.
 */
import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.searchExpression = "";
    }

    componentDidMount() {
        console.log("search componentDidMount invoked");
    }

    buildSearchExpression() {
        this.searchExpression = "";
        this.tagsInQuery.forEach(function(tag, index) {
            if (index != 0) {
                this.searchExpression += " " + this.tagQueryOperator + " ";
            }
            this.searchExpression += tag.tag;
        });
    }

    onTagSelected(event) {
        console.log("onTagSelected invoked");
        this.addedTag = event.target.value;
        console.log("this.addedTag = " + this.addedTag);
    }

    addTagToQuery () {

        console.log("addTagFromQuery invoked");

        if (typeof(this.addedTag) != 'undefined') {
            var tagInQuery = {};
            tagInQuery.tag = this.addedTag;
            this.tagsInQuery.push(tagInQuery);

            this.buildSearchExpression();
        }
    };

    removeTagFromQuery () {
        console.log("removeTagFromQuery invoked");
    }

    tagQueryOperatorUpdated () {
        this.buildSearchExpression();
    }


    render () {

        let tags = [];
        tags.push({ name: "Mom", id: 0}, { name: "Rachel", id: 1}, { name: "Sam", id: 2}, {name: "Joel", id: 3});

        let selectOptions = tags.map(function(tag, index) {
            return (
                <option value={tag.name} key={tag.id}>{tag.name}</option>
            );
        });

        return (
            <div>
                <h4>Search</h4>

                <div className="searchSection">
                    <span className="smallFont">{this.searchExpression}</span>

                    <h5 className="metadataSubheading">Tags</h5>
                    
                    <div className="tagsSubsection">
                        <div>
                            <select defaultValue={tags[0].name} id="tags" onChange={this.onTagSelected.bind(this)}>{selectOptions}</select>
                            <button className="plainButton" type="button" onClick={this.addTagToQuery}>+</button>
                            <button className="plainButton" type="button" onClick={this.removeTagFromQuery}>-</button>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Search;