import YelpApi from '../models/YelpApi';
import {
  GET_PLACE_SUGGEST,
  GET_PLACE_SUGGEST_SUCCESS,
  GET_PLACE_SUGGEST_FAIL,
  SEARCH_PLACE,
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_FAIL
} from './keys';

export function getPlaceSuggestion(text, options = {}) {
  return (dispatch) => {
    dispatch({ type: GET_PLACE_SUGGEST });
    return YelpApi
      .autocomplete({ text, ...options })
      .then((response) => {
        dispatch({
          type: GET_PLACE_SUGGEST_SUCCESS,
          payload: response.data
        });
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch({
          type: GET_PLACE_SUGGEST_FAIL,
          payload: err.response.data
        });
        return Promise.reject(err.response.data);
      });
  };
}

export function searchPlace(params = {}) {
  const {
    term,
    latitude,
    longitude,
    page = 1,
    location,
    ...rest
  } = params;
  const limit = 20;
  const offset = (limit * page) - limit;
  return (dispatch) => {
    dispatch({
      type: SEARCH_PLACE,
      payload: params
    });
    return YelpApi
      .search({
        term,
        location,
        latitude,
        longitude,
        limit,
        offset,
        ...rest
      })
      .then((response) => {
        dispatch({
          type: SEARCH_PLACE_SUCCESS,
          payload: {
            data: response.data,
            currentPage: page,
            totalCount: response.data.total,
            showDataFrom: response.data.total ? offset + 1 : 0,
            showDataTo: response.data.total ? limit * page : 0
          }
        });
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        dispatch({
          type: SEARCH_PLACE_FAIL,
          payload: err.response.data
        });
        return Promise.reject(err.response.data);
      });
  };
}
