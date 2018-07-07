import React, {Component} from 'react';
import NavBar from './NavBar';
import Calendar from './Calendar';
// import SearchBar from 'react-search-bar';
import SearchBar from '@opuscapita/react-searchbar';
import { Link } from 'react-router';

class Home extends Component {

    // societies = [];

    constructor(props) {
        super(props);

        // this.state = {society: []};
        this.state = {searchValue: ""}

    }

    handleSearch(value) {
        if (value) {
          console.info(`Searching "${value}"`);
        }
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

                <SearchBar
                    onSearch={this.handleSearch}
                    value={this.state.searchValue}
                />
               
                <div className="pull-left col-md-9 col-lg-9 col-sm-9" id="col-9" style={{ marginTop: 20}}>
                    <Calendar />
                </div>

                <div className="pull-right col-md-3 col-lg-3 col-sm-3" id="col-3" style={{ marginTop: 20}}>
                    <table className="table table-hover table-dark" border="1">
                        <thead>
                            <tr>
                                <th>Societies</th>
                                <th>Events</th>
                                <th>Attendance</th>                  
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>IT Society</td>
                                <td>Work Shop</td>
                                <td>45</td>
                            </tr>
                        </tbody>
                    </table>
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
