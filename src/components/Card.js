import React, { Component } from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import '../style/newsfeed.scss';

class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <article className="card">
            <CardHeader category={this.props.details.category} image={this.props.details.image}/>
            <CardBody title={this.props.details.title} text={this.props.details.text}/>
          </article>
        );
    }
}

export default Card;
