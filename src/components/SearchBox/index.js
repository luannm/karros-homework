import React, { PureComponent } from 'react';
import { Row, AutoComplete, Button, Input } from 'antd';
import PropTypes from 'prop-types';
import PlaceAutocomplete from '../PlaceAutocomplete';
import './index.less';

const InputGroup = Input.Group;

class SearchBox extends PureComponent {
  render() {
    const {
      onPlaceSearch,
      onPlaceSelect,
      onLocationSelect,
      onLocationSearch,
      placeDatasource,
      onSearchButtonClick
    } = this.props;
    return (
      <Row className="searchBox" type="flex" align="middle" justify="center">
        <InputGroup compact>
          <AutoComplete
            dataSource={placeDatasource}
            className="searchBox__input"
            size="large"
            onSearch={onPlaceSearch}
            onSelect={onPlaceSelect}
          >
            <Input
              placeholder="tacos, cheap dinner, Max's"
              prefix="Find"
            />
          </AutoComplete>
          <PlaceAutocomplete
            size="large"
            className="searchBox__input"
            onLocationSelect={onLocationSelect}
            onLocationSearch={onLocationSearch}
          >
            <Input
              placeholder="Los Angeles, CA"
              prefix="Near"
            />
          </PlaceAutocomplete>
          <Button
            onClick={onSearchButtonClick}
            className="searchBox__button"
            size="large"
            type="primary"
            icon="search"
          />
        </InputGroup>
      </Row>
    );
  }
}

SearchBox.propTypes = {
  onPlaceSearch: PropTypes.func,
  onPlaceSelect: PropTypes.func,
  onLocationSelect: PropTypes.func,
  onLocationSearch: PropTypes.func,
  onSearchButtonClick: PropTypes.func,
  placeDatasource: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default SearchBox;
