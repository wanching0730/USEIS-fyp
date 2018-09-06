import React, { Component } from 'react';
import '../style/newsfeed.scss';

class CardHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { image, category } = this.props;
        var style = { 
            backgroundImage: 'url(' + image + ')',
        };
        return (
          <header style={style} className="card-header">
            <h4 className="card-header--title">{category}</h4>
          </header>
        );
      }
}

export default CardHeader;
