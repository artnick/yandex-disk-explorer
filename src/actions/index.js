export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';

const REQUEST_URL = 'https://cloud-api.yandex.net:443/v1/disk/resources?path=';

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};

const fetchListRequest = () => {
  return {
    type: FETCH_LIST_REQUEST,
  };
};

const fetchListSuccess = (json) => {
  const list = json._embedded.items.map((item) => {
    if (item.type == 'dir') {
      return {
        type: item.type,
        name: item.name,
        path: item.path,
      };
    } else {
      return {
        type: item.type,
        name: item.name,
        size: item.size,
      };
    }
  });
  const currentPath = json.path;
  return {
    type: FETCH_LIST_SUCCESS,
    list,
    currentPath,
  };
};

const fetchListFailure = () => {
  return {
    type: FETCH_LIST_FAILURE,
  };
};

export function fetchList(path) {
  return (dispatch, getState) => {
    dispatch(fetchListRequest());

    const headers = new Headers({ 'Authorization' : `OAuth ${getState().token}` });
    const init = {
      method: 'GET',
      headers: headers,
    };
    return fetch(REQUEST_URL + path, init)
      .then(response => response.json())
      .then(json => dispatch(fetchListSuccess(json)))
      .catch(function(error) { 
        console.log(error); 
        dispatch(fetchListFailure());  
      });
  };
}
