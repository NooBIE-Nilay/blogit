const setAuthToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const setToLocalStorage = ({ key, value }) => {
  localStorage.setItem(key, value);
};

const deleteFromLocalStorage = key => localStorage.removeItem(key);
const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export {
  setToLocalStorage,
  setAuthToLocalStorage,
  getFromLocalStorage,
  deleteFromLocalStorage,
};
