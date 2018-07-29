import React, {Component} from 'react';
import NavBar from './NavBar';
import Calendar from './Calendar';
import SearchBar from '@opuscapita/react-searchbar';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../style/home.css';

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

    componentDidMount() {
        //this.listSocieties();
        window.scrollTo(0, 0);
    }

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

        return (
            <div id="outerDiv"> 
                <NavBar />

                <div style={{ margin: 20 }}>
                    <Breadcrumb>
                        <BreadcrumbItem active>Home</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div id="searchBarDiv" style={{ margin: 20 }}>
                    <SearchBar
                        onSearch={this.handleSearch}
                        value={this.state.searchValue}
                    />
                </div>

                <div className="pull-left col-md-8 col-lg-8 col-sm-8" id="col-9" style={{ marginTop: 20}}>
                    <Calendar />
                </div>

                <div className="pull-right col-md-4 col-lg-4 col-sm-4" id="col-3" style={{ marginTop: 20}}>
                    <h4>Event Recommendations</h4>
                    <table className="table table-hover table-light" border="1">
                        <thead>
                            <tr>
                                <th>Events</th>
                                <th>Organiser</th>
                                <th>Attendance</th>                  
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Work Shop</td>
                                <td>IT Society</td>
                                <td>45</td>
                            </tr>
                            <tr>
                                <td>USTAR 8</td>
                                <td>Music Society</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <td>Performance</td>
                                <td>Wushu Society</td>
                                <td>38</td>
                            </tr>
                        </tbody>
                    </table>

                    <br/>
                    <br/>

                    <h4>Society Recommendations</h4>
                    <table className="table table-hover table-light" border="1">
                        <thead>
                            <tr>
                                <th>Societies</th>             
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>IT Society</td>
                            </tr>
                            <tr>
                                <td>Music Society</td>
                            </tr>
                            <tr>
                                <td>Wushu Society</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        );
    };
};

const styles = {
    divStyle: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}

export default Home;
