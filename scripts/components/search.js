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
            tagQueryOperator: 'OR',
            dateValue: "2016-04-17",
        };
    }

    componentDidMount() {
        console.log("search componentDidMount invoked");

        var today = new Date();
        // console.log("today is " + today.toDateString());
        // let formattedDate = today.getFullYear().toString() + "-0" + (today.getMonth() + 1).toString() + "-" + today.getDate().toString();
        let formattedDate = this.formatDate(today);
        this.setState({dateValue: formattedDate});
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

    onDateChanged(event) {
        console.log("onDateChanged");

        let actualDate = event.target.valueAsDate.addDays(1);
        let formattedDate = this.formatDate(actualDate);
        this.setState({dateValue: formattedDate});
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

                    <div id="beforeDateDiv">
                        <span className="dateLabel">Before</span>
                        <input className="smallFont dateInput" type="date" id="beforeDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
                    </div>

                    <div id="afterDateDiv">
                        <span className="dateLabel">After</span>
                        <input className="smallFont dateInput" type="date" id="afterDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
                    </div>

                    <div id="onDateDiv">
                        <span className="dateLabel">On</span>
                        <input className="smallFont dateInput" type="date" id="onDate" onChange={this.onDateChanged.bind(this)} value={this.state.dateValue}/>
                    </div>

                </div>
                
            </div>
        )
    }
}

export default Search;