import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, notification } from 'antd';
import _ from 'lodash';
import classnames from 'classnames';
import SearchBox from '../../components/SearchBox';
import { getPlaceSuggestion, searchPlace } from '../../actions/yelp';
import './index.less';

const { Header } = Layout;

class AppHeader extends Component {
  constructor() {
    super();
    this.state = {
      placeDatasource: [],
      searchTerm: null,
      searchLatLng: null
    };
    this.handlePlaceSearch = _.debounce(this.handlePlaceSearch.bind(this), 500);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
    this.generateSearchParams = this.generateSearchParams.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { placeSuggestionError, placeSuggestion } = nextProps;
    if (placeSuggestionError) {
      notification['error']({
        message: 'Error',
        description: 'We’re sorry, something seems to have gone wrong. Please try again.',
      });
      return;
    }
    this.updateDataSource(placeSuggestion);
  }

  updateDataSource(data) {
    const placeDatasource = data ? _.concat(
      data.terms.map(item => item.text),
      data.categories.map(item => item.title),
      data.businesses.map(item => item.name || item.text)
    ) : [];
    this.setState({ placeDatasource });
  }

  generateSearchParams() {
    const { searchTerm, searchLatLng } = this.state;
    const params = {
      term: searchTerm,
      address: 'Los Angeles, CA',
    };
    if (searchLatLng) {
      params.latitude = searchLatLng.lat;
      params.longitude = searchLatLng.lng;
      params.address = searchLatLng.address;
    } else {
      params.location = params.address;
    }
    return params;
  }

  searchPlace() {
    this.props.searchPlace(this.generateSearchParams())
      .catch(err => console.log('=== searchPlace error ===: ', err));
  }

  handlePlaceSearch(value) {
    if (!value || value === '') {
      this.setState({ placeDatasource: [], searchTerm: null });
      return;
    }
    this.props.getPlaceSuggestion(value)
      .catch(err => console.log('=== getPlaceSuggestion error ===: ', err));
  }

  handlePlaceSelect(value, option) {
    this.setState({
      searchTerm: value
    }, this.searchPlace);
  }

  handleLocationSelect(value, option) {
    this.setState({
      searchLatLng: value
    }, this.searchPlace);
  }

  handleLocationSearch(value) {
    if (!value || value === '') {
      this.setState({ searchLatLng: null });
    }
  }

  handleSearchButtonClick() {
    this.searchPlace();
  }

  render() {
    return (
      <Header className={classnames('appHeader', this.props.className)}>
        <SearchBox
          onPlaceSearch={this.handlePlaceSearch}
          onPlaceSelect={this.handlePlaceSelect}
          onLocationSelect={this.handleLocationSelect}
          onLocationSearch={this.handleLocationSearch}
          placeDatasource={this.state.placeDatasource}
          onSearchButtonClick={this.handleSearchButtonClick}
        />
      </Header>
    );
  }
}

AppHeader.propTypes = {
  className: PropTypes.string,
  getPlaceSuggestion: PropTypes.func,
  searchPlace: PropTypes.func,
  placeSuggestion: PropTypes.object,
  placeSuggestionError: PropTypes.object
};

const mapStateToProps = ({ yelp }) => ({
  placeSuggestion: yelp.placeSuggestion,
  placeSuggestionError: yelp.placeSuggestionError,
});

export default connect(
  mapStateToProps,
  { getPlaceSuggestion, searchPlace })(AppHeader);
