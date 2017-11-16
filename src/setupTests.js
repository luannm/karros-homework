/* eslint-disable */
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.google = {
  maps: {
    Geocoder: function () {
      return {
        geocode: function (params, cb) {
          return cb([
            {
              geometry: {
                location: {
                  lat: function () {
                    return 0.1;
                  },
                  lng: function () {
                    return 0.2
                  }
                }
              }
            }
          ], 'OK')
        }
      }
    },
    GeocoderStatus: {
      OK: 'OK'
    },
    places: {
      AutocompleteService: function () {
        return {getPlacePredictions() {}};
      },
      PlacesServiceStatus: {
        OK: 'OK'
      }
    }
  }
};

configure({adapter: new Adapter()});
