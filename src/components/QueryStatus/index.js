import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './index.less';

class QueryStatus extends PureComponent {
  render() {
    const { searchTerm, searchLocation, showDataFrom, showDataTo, searchTotal } = this.props;
    return (
      <Row type="flex" align="middle">
        <Col md={12} xs={24}>
          {
            searchTerm
              ? <h1>Best {searchTerm} in {searchLocation}</h1>
              : <h1>Browsing {searchLocation}</h1>
          }
        </Col>
        <Col md={12} xs={24} style={{ textAlign: 'right' }}>
          <span>Showing {showDataFrom}-{showDataTo} of {searchTotal}</span>
        </Col>
      </Row>
    );
  }
}

QueryStatus.defaultProps = {
  showDataFrom: 0,
  showDataTo: 0,
  searchTotal: 0
};

QueryStatus.propTypes = {
  searchTerm: PropTypes.string,
  searchLocation: PropTypes.string,
  showDataFrom: PropTypes.number,
  showDataTo: PropTypes.number,
  searchTotal: PropTypes.number
};

export default QueryStatus;
