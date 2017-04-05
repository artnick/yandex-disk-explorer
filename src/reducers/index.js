import { FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE} from '../actions/';

const initialState = { 
  currentPath: '/', 
  list: [],
  isLoading: false,
  token: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        list: [],
        isLoading: true,
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
        currentPath: action.currentPath, 
        isLoading: false,
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;