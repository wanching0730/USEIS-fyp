import React, { PropTypes as T } from 'react';
import PropTypes from 'prop-types'; 

export default class RowNumber extends React.Component {

    static propTypes = {
        rowNumber: PropTypes.string,
        bold: PropTypes.bool
    }

    render() {
        const style = { fontWeight: this.props.bold ? 700 : 'normal' };
        return (
            <div style={style} className="RowNumber">
                {this.props.rowNumber}
            </div>
        );
    }
}
