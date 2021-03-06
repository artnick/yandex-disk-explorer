export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';
export const SET_TOKEN = 'SET_TOKEN';
export const RESET_TOKEN = 'RESET_TOKEN';

const REQUEST_URL = 'https://cloud-api.yandex.net:443/v1/disk/resources?path=';

//copy only keys what you need
export const partialCopyObj = (obj, keys) => {
  let newObj = {};
  for (let key in obj) {
    if(keys.indexOf(key) != -1)
      newObj[key] = obj[key];
  }
  return newObj;
};

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};

const resetToken = () => {
  return {
    type: RESET_TOKEN,
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
      return partialCopyObj(item, ['type','name','path']);
    } else {
      return partialCopyObj(item, ['type','name','size']);
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
      headers: headers,
    };
    return fetch(REQUEST_URL + path, init)
      .then((response) => {
        //reset token if it is invalid
        if(response.status == 401) {
          dispatch(resetToken());
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(fetchListSuccess(json)))
      .catch(function(error) { 
        console.log(error); 
        dispatch(fetchListFailure());  
      });
  };
}
