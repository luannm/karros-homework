import { combineReducers } from 'redux';
import yelpReducer from './yelp';

export default combineReducers({
  yelp: yelpReducer
});
