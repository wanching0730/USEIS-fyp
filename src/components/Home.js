import React, {Component} from 'react';
import NavBar from './NavBar';
import Calendar from './Calendar';
import { Link } from 'react-router';

class Home extends Component {

    // societies = [];

    constructor(props) {
        super(props);

        // this.state = {society: []};

    }

    // componentDidMount() {
    //     this.listSocieties();
    // }

    // listSocieties() {
    //     //fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => this.setState({society: reply}));
    //     fetch(`http://localhost:5000/puppies`).then(result => result.json()).then(reply => {
    //         console.log(reply);
    //         reply.forEach(element => {
    //             this.societies.push({
    //                 id: element[0],
    //                 title: element[1],
    //                 allDay: element[2],
    //                 start: element[3],
    //                 end: element[4]
    //             });
    //         });

    //         this.setState({society: this.societies});
    
    //         console.log("societies: " + JSON.stringify(this.societies));
            
    //     });
    // }

    render() {

        // const { imageStyle } = styles;

        return (
            <div id="outerDiv"> 
                <NavBar />
                
                <div style={{ marginTop: 20}}>
                    <Calendar />
                </div>
                
                
                {/* <img style={imageStyle} src={ require('../assets/images/image1.jpg') } /> */}
                                           
            </div>
        );
    };
};

// const styles = {
//     imageStyle: {
//         height: "50px",
//         width: "50px"
//     }
// }

export default Home;
