import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import LoadingBar from './LoadingBar';
import { Doughnut, HorizontalBar } from '../../node_modules/react-chartjs-2';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveAll, retrieveData } from '../actions/data-action';

class Analysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            donutLabels: [],
            barLabels: [],
            donutData: [],
            barData: []
        };
        console.log(this.props.id);
        this.props.onRetrieveAll("recommendedSocieties");
        this.props.onRetrieveData("recommendedEvents", this.props.id);
    }

    componentWillReceiveProps(nextProps){
        console.log("this props: " + this.props.recommendedSocieties);
        console.log("next props: " + nextProps.recommendedSocieties);

        if((nextProps.recommendedSocieties != this.props.recommendedSocieties) && (nextProps.recommendedSocieties != null)) {
            let recommendedSocieties = nextProps.recommendedSocieties;
            console.log(recommendedSocieties);

            if(recommendedSocieties.length > 0) {
                for(var i = 0; i < recommendedSocieties.length; i++) {
                    this.state.barLabels.push(recommendedSocieties[i]["name"]);
                    this.state.barData.push(recommendedSocieties[i]["total"]);
                }
            }
        }

        if((nextProps.recommendedEvents != this.props.recommendedEvents) && (nextProps.recommendedEvents != null)) {
            console.log("this props: " + this.props.recommendedEvents);
            console.log("next props: " + nextProps.recommendedEvents);
            let recommendedEvents = nextProps.recommendedEvents;
            console.log(recommendedEvents);

            if(recommendedEvents.length > 0) {
                let eventNames = recommendedEvents[0]["eventId"].split(",");
                let ratings = recommendedEvents[0]["rating"].split(", ");
                console.log(ratings);

                this.setState({
                    donutLabels: eventNames.slice(0,3),
                    donutData: ratings.slice(0,3) 
                });
            }
        }
    }

    clickEvent(event) {
        console.log(event);
        browserHistory.push("/perEvent/1");
    }

    clickSociety(event) {
        browserHistory.push("/perSociety/1");
    }

    render() {
        if(this.props.recommendedSocieties != null && this.props.recommendedEvents != null) {

            var doughnutData, barData;
        
            doughnutData = {
                labels: this.state.donutLabels.length > 0 ? this.state.donutLabels : ["none"],
                datasets: [{
                    data: this.state.donutData.length > 0 ? this.state.donutData : [1],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            };

            barData = {
                labels: this.state.barLabels.length > 0 ? this.state.barLabels : ["none"],
                datasets: [
                {
                    label: 'Total Participants',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.barData.length > 0 ? this.state.barData : [1],
                }
                ]
            };
        }
          

        return (
            
            <div>
                {this.props.loading ?
            [<LoadingBar />]
          :
          [
              <div>
                <div>
                    <h2 style={{textAlign: "center"}}>Recommended Events</h2>
                    <Doughnut data={doughnutData} />
                </div>

                <br/>

                <div>
                    <h2>Active Societies</h2>
                    <HorizontalBar data={barData} />
                </div>
                </div>
                ]}
            </div>
        
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        recommendedSocieties: state.data.recommendedSocieties,
        recommendedEvents: state.data.recommendedEvents,
        id: state.auth.id,
        loading: state.data.loading
    };
};

const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
      onRetrieveAll: retrieveAll,
      onRetrieveData: retrieveData
    }, dispatch);
};

export default connect(mapStateToProps, mapActionsToProps)(Analysis);