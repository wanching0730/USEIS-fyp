import React from 'react';
import color from 'rcolor';
import Graph from './Graph';
import { Line, Doughnut } from '../../node_modules/react-chartjs-2';

class Analysis extends React.Component {

    constructor(props) {
        super(props);

        this.state = {getState: 
            {
                labels: [
                  'Red',
                  'Green',
                  'Yellow'
                ],
                datasets: [{
                  data: [this.getRandomInt(50, 200), this.getRandomInt(100, 150), this.getRandomInt(150, 250)],
                  backgroundColor: [
                  '#CCC',
                  '#36A2EB',
                  '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
                  ]
                }]
              }}

    }


    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
	componentDidMount() {
		setInterval(() => 5000);
    }
    
    render() {


        

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          };

          
        return (
            <div>
            <h2>Line Example</h2>
            <Line data={data} width={100} height={50} />

            <h2>Dynamicly refreshed Doughnut Example</h2>
            <Doughnut data={this.state.getState} width={100} height={50} />

          </div>
        );
    }
    
}

export default Analysis;