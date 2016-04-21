/**
 * Created by tedshaffer on 4/20/16.
 */
import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchExpression: "",
            tagsInQuery: [],
            tagQueryOperator: 'OR'
        };
    }

    componentDidMount() {
        console.log("search componentDidMount invoked");
    }

    buildSearchExpression() {

        var self = this;

        let searchExpression = "";
        this.state.tagsInQuery.forEach(function(tag, index) {
            if (index != 0) {
                searchExpression += " " + self.state.tagQueryOperator + " ";
            }
            searchExpression += tag.tag;
        });
        this.setState({ searchExpression: searchExpression });
    }

    onTagSelected(event) {
        console.log("onTagSelected invoked");
        this.addedTag = event.target.value;
        console.log("this.addedTag = " + this.addedTag);
    }

    onDateQueryTypeChanged(event) {
        console.log("onDateQueryTypeChanged invoked");
    }

    addTagToQuery () {

        console.log("addTagFromQuery invoked");

        let tagsInQuery = this.state.tagsInQuery;

        if (typeof(this.addedTag) != 'undefined') {
            var tagInQuery = {};
            tagInQuery.tag = this.addedTag;
            tagsInQuery.push(tagInQuery);

            this.setState({tagsInQuery: tagsInQuery});

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
        this.addedTag = tags[0];

        let selectOptions = tags.map(function(tag, index) {
            return (
                <option value={tag.name} key={tag.id}>{tag.name}</option>
            );
        });

        return (
            <div>
                <h4>Search</h4>

                <div className="searchSection">
                    <span className="smallFont">{this.state.searchExpression}</span>

                    <h5 className="metadataSubheading">Tags</h5>
                    
                    <div className="tagsSubsection">
                        <div>
                            <select defaultValue={tags[0].name} id="tags" onChange={this.onTagSelected.bind(this)}>{selectOptions}</select>
                            <button className="plainButton" type="button" onClick={this.addTagToQuery.bind(this)}>+</button>
                            <button className="plainButton" type="button" onClick={this.removeTagFromQuery.bind(this)}>-</button>
                        </div>

                    </div>

                </div>

                <h5 className="metadataSubheading">Dates</h5>

                <div className="datesSubsection">
                    <div>
                        <label className="smallFont">
                            <input type="radio" className="dateQueryTypeRadioFirst" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="none"/>None
                        </label>

                        <label className="smallFont">
                            <input type="radio" className="dateQueryTypeRadio" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="before" />Before
                        </label>

                        <label className="smallFont">
                            <input type="radio" className="dateQueryTypeRadio" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="after" />After
                        </label>

                        <label className="smallFont">
                            <input type="radio" className="dateQueryTypeRadio" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="on" />On
                        </label>

                        <label className="smallFont">
                            <input type="radio" className="dateQueryTypeRadio" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="between" />Between
                        </label>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Search;