/**
 * Created by tedshaffer on 4/20/16.
 */
import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchExpression: "",
            tags: [],
            tagsInQuery: [],
            tagQueryOperator: 'OR',
            dateQueryType: 'none',
            dateValue: "2016-04-17",
            startDateValue: "2016-04-17",
            endDateValue: "2016-04-19",
        };
    }

    componentDidMount() {
        console.log("search componentDidMount invoked");

        var today = new Date();
        // console.log("today is " + today.toDateString());
        // let formattedDate = today.getFullYear().toString() + "-0" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        let formattedDate = this.formatDate(today);
        this.setState({dateValue: formattedDate});

        // retrieve tags from db
        this.getTags();
    }

    getTags() {

        this.tags = [];

        const url = "http://localhost:3000/";
        const getTagsUrl = url + "getTags";

        var self = this;

        $.get({
            url: getTagsUrl,
            success: function(result) {
                console.log("getTags successful");
                result.Tags.forEach(function(tag, index){
                    let tagObj = { name: tag.label, id: index};
                    self.state.tags.push(tagObj);
                });
                self.addedTag = self.state.tags[0].name;
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("errors retrieving tags in getTags");
                console.error(getTagsUrl, status, err.toString());
            }.bind(this)
        });
    }

    prependZero(str) {
        if (str.length == 1) {
            return "0" + str;
        }
        return str;
    }

    formatDate(date) {

        var month = this.prependZero(date.getMonth() + 1).toString();
        var dayInMonth = (date.getDate()).toString();
        return date.getFullYear().toString() + "-" + this.prependZero(month) + "-" + this.prependZero(dayInMonth);
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
        this.setState({dateQueryType: event.target.value});
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

    tagQueryOperatorUpdated (event) {
        this.state.tagQueryOperator = event.target.value;
        this.buildSearchExpression();
    }

    buildQuerySpec = function() {

        var querySpec = {};
        querySpec.tagsInQuery = this.state.tagsInQuery;
        querySpec.tagQueryOperator = this.state.tagQueryOperator;

        querySpec.dateQueryType = this.state.dateQueryType;
        querySpec.dateValue = this.state.dateValue;
        querySpec.startDateValue = this.state.startDateValue;
        querySpec.endDateValue = this.state.endDateValue;

        return querySpec;
    }


    search() {

        console.log("performSearch");

        var querySpec = this.buildQuerySpec();
        querySpec.tagsInQuery = this.state.tagsInQuery;

        this.props.onQueryPhotos(querySpec);
    }

    onDateChanged(event) {
        console.log("onDateChanged");

        let actualDate = event.target.valueAsDate.addDays(1);
        let formattedDate = this.formatDate(actualDate);
        this.setState({dateValue: formattedDate});
    }

    onStartDateChanged(event) {
        console.log("onStartDateChanged");

        let actualDate = event.target.valueAsDate.addDays(1);
        let formattedDate = this.formatDate(actualDate);
        this.setState({startDateValue: formattedDate});
    }

    onEndDateChanged(event) {
        console.log("onEndDateChanged");

        let actualDate = event.target.valueAsDate.addDays(1);
        let formattedDate = this.formatDate(actualDate);
        this.setState({endDateValue: formattedDate});
    }

    beforeDateDiv() {
        return (
            <div id="beforeDateDiv">
                <span className="dateLabel">Before</span>
                <input className="smallFont dateInput" type="date" id="beforeDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
            </div>
        );
    }

    afterDateDiv() {
        return (
            <div id="afterDateDiv">
                <span className="dateLabel">After</span>
                <input className="smallFont dateInput" type="date" id="afterDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
            </div>
        );
    }

    onDateDiv() {
        return (
            <div id="onDateDiv">
                <span className="dateLabel">On</span>
                <input className="smallFont dateInput" type="date" id="onDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
            </div>
        );
    }

    betweenDateDiv() {
        return (
            <div id="betweenDateDiv">
                <span className="dateLabelBetween">Between</span>
                <input className="smallFont width130" type="date" id="startDate" onChange={this.onStartDateChanged.bind(this)} value={this.state.startDateValue}/>
                <span className="dateLabelBetween">and</span>
                <input className="smallFont width130" type="date" id="endDate"  onChange={this.onEndDateChanged.bind(this)} value={this.state.endDateValue}/>
            </div>
        );
    }

    render () {

        // let tags = [];
        // tags.push({ name: "Mom", id: 0}, { name: "Rachel", id: 1}, { name: "Sam", id: 2}, {name: "Joel", id: 3});
        // this.addedTag = tags[0].name;

        let selectOptions = this.state.tags.map(function(tag, index) {
            return (
                <option value={tag.name} key={tag.id}>{tag.name}</option>
            );
        });

        let tagsDiv = <div></div>;
        if (this.state.tags.length > 0) {
            tagsDiv =
                <div>
                    <select defaultValue={this.state.tags[0].name} id="tags" onChange={this.onTagSelected.bind(this)}>{selectOptions}</select>
                    <button className="plainButton" type="button" onClick={this.addTagToQuery.bind(this)}>+</button>
                    <button className="plainButton" type="button" onClick={this.removeTagFromQuery.bind(this)}>-</button>
                </div>
        }

        return (
            <div>
                <h4>Search</h4>

                <div className="searchSection">

                    <span className="smallFont">{this.state.searchExpression}</span>

                    <h5 className="metadataSubheading">Tags</h5>
                    
                    <div className="tagsSubsection">

                        {tagsDiv}

                        <div>
                            <div>
                                <span className="smallFont mr4">Matches</span>
                                <label className="smallFont">
                                    <input type="radio" className="tagQueryLeft" name="tagQueryOperator" onClick={this.tagQueryOperatorUpdated.bind(this)} ng-model="tagQueryOperator" value="OR"/>Any tag
                                </label>

                                <label className="smallFont">
                                    <input type="radio" className="tagQueryRight" name="tagQueryOperator" onClick={this.tagQueryOperatorUpdated.bind(this)} ng-model="tagQueryOperator"value="AND"/>All tags
                                </label>

                            </div>

                        </div>

                    </div>


                    <h5 className="metadataSubheading">Dates</h5>

                    <div className="datesSubsection">
                        <div>
                            <label className="smallFont">
                                <input type="radio" className="dateQueryTypeRadioFirst" name="dateQueryType" onChange={this.onDateQueryTypeChanged.bind(this)} value="none" />None
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

                        { this.state.dateQueryType == 'before' ? this.beforeDateDiv() : null }
                        { this.state.dateQueryType == 'after' ? this.afterDateDiv() : null }
                        { this.state.dateQueryType == 'on' ? this.onDateDiv() : null }
                        { this.state.dateQueryType == 'between' ? this.betweenDateDiv() : null }

                    </div>

                </div>

                <div id="search">
                    <button type="button" onClick={this.search.bind(this)} className="mediumFont">Search</button>
                </div>

            </div>
        )
    }
}

export default Search;