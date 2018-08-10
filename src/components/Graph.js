import React from 'react';
import {Bar} from '../../node_modules/react-chartjs-2';
import color from '../../node_modules/rcolor';

class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.state = {initialState :
             {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
        }
};
    }

    componentWillMount(){
		this.setState(this.state.initialState);
	}
	componentDidMount(){

        var _this = this;
        
		setInterval(function(){
			var oldDataSet = _this.state.datasets[0];
			var newData = [];

			for(var x=0; x< _this.state.labels.length; x++){
				newData.push(Math.floor(Math.random() * 100));
			}

			var newDataSet = {
				...oldDataSet
			};

			newDataSet.data = newData;
			newDataSet.backgroundColor = color();
			newDataSet.borderColor = color();
			newDataSet.hoverBackgroundColor = color();
			newDataSet.hoverBorderColor = color();

			var newState = {
				...this.state.initialState,
				datasets: [newDataSet]
			};

			_this.setState(newState);
		}, 5000);
	}

    
    render() {
        
          

        
        return (
            <Bar data={this.state} />
        );
    }
    
}

export default Graph;