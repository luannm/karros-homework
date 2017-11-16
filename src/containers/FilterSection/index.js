import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.less';
import QueryStatus from '../../components/QueryStatus';
import Filters from '../../components/Filters';

class FilterSection extends PureComponent {
  render() {
    const { searchQuery, totalCount, showDataFrom, showDataTo } = this.props;
    return (
      <div className="filterSection">
        <QueryStatus
          searchTerm={searchQuery.term}
          searchLocation={searchQuery.address}
          searchTotal={totalCount}
          showDataFrom={showDataFrom}
          showDataTo={showDataTo}
        />
        <Filters />
      </div>
    );
  }
}

FilterSection.propTypes = {
  searchQuery: PropTypes.object,
  totalCount: PropTypes.number,
  showDataFrom: PropTypes.number,
  showDataTo: PropTypes.number
};

const mapStateToProps = ({ yelp }) => ({
  searchQuery: yelp.searchQuery,
  placeData: yelp.placeData,
  showDataFrom: yelp.showDataFrom,
  showDataTo: yelp.showDataTo,
  totalCount: yelp.totalCount
});

export default connect(
  mapStateToProps,
  null)(FilterSection);

