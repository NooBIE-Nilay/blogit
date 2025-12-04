const setAuthToLocalStorage = ({ authToken, email, userId, userName }) => {
  if (authToken === null) localStorage.removeItem("authToken");
  else localStorage.setItem("authToken", JSON.stringify(authToken));

  if (email === null) localStorage.removeItem("authEmail");
  else localStorage.setItem("authEmail", JSON.stringify(email));

  if (userId === null) localStorage.removeItem("authUserId");
  else localStorage.setItem("authUserId", JSON.stringify(userId));

  if (userName === null) localStorage.removeItem("authUserName");
  else localStorage.setItem("authUserName", JSON.stringify(userName));
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
