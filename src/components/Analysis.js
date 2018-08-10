import React, {Component} from 'react';
import { Doughnut, HorizontalBar } from '../../node_modules/react-chartjs-2';

class Analysis extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const doughnutData = {
            labels: [
                'First Aid Society',
                'IT Society',
                'Sport Club'
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
                    <Doughnut data={doughnutData} />
                </div>

                <br/>

                <div>
                    <h2>Active Societies</h2>
                    <HorizontalBar data={barData} />
                </div>
            </div>
        );
    }
}

export default Analysis;