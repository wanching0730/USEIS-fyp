import React, {Component} from 'react';
import { Doughnut } from '../../node_modules/react-chartjs-2';

class Analysis extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const data = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
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

        return (
            <div>
                <h2>Doughnut Example</h2>
                <Doughnut data={data} />
            </div>
        );
    }
}

export default Analysis;