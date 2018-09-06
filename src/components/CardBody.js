import React, { Component } from 'react';
import '../style/newsfeed.scss';

class CardBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="card-body">
            <p className="date">March 20 2015</p>
            
            <h2>{this.props.title}</h2>
            
            <p className="body-content">{this.props.text}</p>
            
            <button className="button button-primary">
                <i className="fa fa-chevron-right"></i> Find out more
            </button>
          </div>
        );
    }
}

export default CardBody;
