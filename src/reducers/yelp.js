import {
  GET_PLACE_SUGGEST,
  GET_PLACE_SUGGEST_SUCCESS,
  GET_PLACE_SUGGEST_FAIL,
  SEARCH_PLACE,
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_FAIL
} from '../actions/keys';

const INITIAL_STATE = {
  placeSuggestion: null,
  placeSuggestionError: null,
  placeData: null,
  placeDataLoading: false,
  placeDataError: null,
  searchQuery: {},
  currentPage: 1,
  showDataFrom: 0,
  showDataTo: 0,
  totalCount: 0
};

export default function(state = INITIAL_STATE, action) {
  const { payload } = action;
  switch (action.type) {
    case GET_PLACE_SUGGEST:
      return {
        ...state,
        placeSuggestionError: null
      };
    case GET_PLACE_SUGGEST_SUCCESS:
      return {
        ...state,
        placeSuggestion: payload,
        placeSuggestionError: null
      };
    case GET_PLACE_SUGGEST_FAIL:
      return {
        ...state,
        placeSuggestion: null,
        placeSuggestionError: payload
      };
    case SEARCH_PLACE:
      return {
        ...state,
        placeDataError: null,
        placeDataLoading: true,
        searchQuery: payload
      };
    case SEARCH_PLACE_SUCCESS:
      return {
        ...state,
        placeData: payload.data,
        totalCount: payload.totalCount,
        currentPage: payload.currentPage,
        showDataFrom: payload.showDataFrom,
        showDataTo: payload.showDataTo,
        placeDataError: null,
        placeDataLoading: false
      };
    case SEARCH_PLACE_FAIL:
      return {
        ...state,
        placeData: null,
        placeDataError: payload,
        placeDataLoading: false
      };
    default:
      return state;
  }
}
