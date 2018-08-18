import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import { Doughnut, HorizontalBar } from '../../node_modules/react-chartjs-2';

class Analysis extends Component {
    constructor(props) {
        super(props);
    }

    clickEvent(event) {
        browserHistory.push("/perEvent/1");
    }

    clickSociety(event) {
        browserHistory.push("/perSociety/1");
    }

    render() {

        const doughnutData = {
            labels: [
                'Cardio Night Run',
                'Blood Donation',
                'Engineering Fiesta'
            ],
            datasets: [{
                data: [200, 30, 50],
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

        const barData = {
            labels: ['IT Society', 'First Aid Society', 'Sport Club', 'Music Club', 'Engineering Society', 'Wushu Club', 'Yoga Society'],
            datasets: [
              {
                label: 'Total Participants',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          };
          

        return (
            <div>
                <div>
                    <h2>Top 3 Famous Events</h2>
                    <Doughnut data={doughnutData} onElementsClick={this.clickEvent} />
                </div>

                <br/>

                <div>
                    <h2>Active Societies</h2>
                    <HorizontalBar data={barData} onElementsClick={this.clickSociety} />
                </div>
            </div>
        );
    }
}

export default Analysis;