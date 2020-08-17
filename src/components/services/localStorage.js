export const get = key => {
  if (!localStorage[key]) {
    return false;
  }
  return JSON.parse(localStorage.getItem(key));
};

export const set = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};
