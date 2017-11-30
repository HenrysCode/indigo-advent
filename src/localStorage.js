export const loadState = () => {
  try {
    const serlializesState = localStorage.getItem('state');
    if (serlializesState === null) {
      return undefined;
    }
    return JSON.parse(serlializesState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serlializesState = JSON.stringify(state);
    localStorage.setItem('state', serlializesState);
  } catch (err) {
    console.log(err)
  }

}