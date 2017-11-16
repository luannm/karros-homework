import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

class PlaceAutocomplete extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
    this.handleLocationSearch = _.debounce(this.fetchPredictions.bind(this), 500);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
  }

  componentDidMount() {
    if (!window.google) {
      throw new Error('Google Maps JavaScript API library must be loaded');
    }

    if (!window.google.maps.places) {
      throw new Error('Google Maps Places library must be loaded. Please add `libraries=places` to the src URL.');
    }

    const google = window.google;
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
    this.geocoder = new google.maps.Geocoder();
    this.geocoderOK = google.maps.GeocoderStatus.OK;
  }

  getLatLng(address) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results, status) => {
        if (status !== this.geocoderOK) {
          reject(status);
        }
        const latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          address
        };
        resolve(latLng);
      });
    });
  }

  autocompleteCallback(predictions, status) {
    if (status !== this.autocompleteOK) {
      return;
    }
    this.setState({
      dataSource: predictions.map((p, idx) => ({
        text: p.description,
        value: p.description
      }))
    });
  }

  fetchPredictions(value) {
    const { onLocationSearch } = this.props;
    onLocationSearch && onLocationSearch(value);
    if (value.length) {
      this.autocompleteService.getPlacePredictions({
        types: ['geocode'],
        input: value
      }, this.autocompleteCallback.bind(this));
    } else {
      this.setState({ dataSource: [] });
    }
  }

  handleLocationSelect(value, options) {
    const { onLocationSelect } = this.props;
    this.getLatLng(value)
      .then(latLng => onLocationSelect && onLocationSelect(latLng, options))
      .catch(err => console.log('Error when get latitude and logitute for address ', value));
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <AutoComplete
        dataSource={this.state.dataSource}
        onSearch={this.handleLocationSearch}
        onSelect={this.handleLocationSelect}
        {...rest}
      >
        {children}
      </AutoComplete>
    );
  }
}

PlaceAutocomplete.propTypes = {
  onLocationSearch: PropTypes.func,
  onLocationSelect: PropTypes.func,
  children: PropTypes.node
};

export default PlaceAutocomplete;

