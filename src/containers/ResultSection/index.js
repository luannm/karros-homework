import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Pagination } from 'antd';
import { searchPlace } from '../../actions/yelp';
import ResultCard from '../../components/ResultCard';
import './index.less';

class ResultSection extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { placeDataError, placeData, placeDataLoading } = nextProps;
    const newState = {
      data: [],
      isLoading: placeDataLoading
    };
    if (placeDataError) {
      this.setState({ isLoading: placeDataLoading });
    }
    if (!placeDataLoading) {
      newState.data = placeData ? placeData.businesses : [];
    }
    this.setState(newState);
  }

  handlePagination(page, pageSize) {
    const { searchPlace, searchQuery } = this.props;
    searchPlace({
      ...searchQuery,
      page
    })
      .catch(err => console.log('=== searchPlace error ===: ', err));
  }

  _renderResult(data) {
    const { currentPage, totalCount, showDataFrom } = this.props;
    return (
      data.length > 0
        ? (
          <div>
            {
              data.map((item, index) =>
                <ResultCard key={item.id} number={showDataFrom + index} data={item} />
              )
            }
            <Pagination
              onChange={this.handlePagination}
              current={currentPage}
              total={totalCount}
              className="resultSection__pagination"
            />
          </div>
        )
        : null
    );
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="resultSection">
        {
          isLoading
            ? <Spin />
            : this._renderResult(data)
        }
      </div>
    );
  }
}

ResultSection.propTypes = {
  placeDataError: PropTypes.object,
  placeData: PropTypes.object,
  placeDataLoading: PropTypes.bool,
  searchPlace: PropTypes.func,
  searchQuery: PropTypes.object,
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  showDataFrom: PropTypes.number
};

const mapStateToProps = ({ yelp }) => ({
  placeData: yelp.placeData,
  placeDataError: yelp.placeDataError,
  placeDataLoading: yelp.placeDataLoading,
  searchQuery: yelp.searchQuery,
  currentPage: yelp.currentPage,
  showDataFrom: yelp.showDataFrom,
  totalCount: yelp.totalCount
});

export default connect(
  mapStateToProps,
  { searchPlace })(ResultSection);

