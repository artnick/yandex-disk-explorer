const storageAvailable = (type) => {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
};

export const saveTokenToStorage = (token) => {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('token', token);
    return true;
  }
  else {
    return false;
  }
};

export const getTokenFromStorage = () => {
  if (storageAvailable('localStorage')) {
    return localStorage.getItem('token');
  }
  else {
    return '';
  }
};