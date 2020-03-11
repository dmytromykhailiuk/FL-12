const toggleMenu = (id) => {
  return {
    type: 'COURSE_TOGLE_MENU',
    payload: id
  };
};

const onInputChange = (target, value) => {
  return {
    type: 'ON_INPUT_CHANGE',
    payload: {target, value}
  };
};

const clearFields = () => {
  return {
    type: 'CLEAR_INPUTS_FIELDS'
  };
};


const saveChanging = (id) => {
  return {
    type: 'SAVE_CHANGING',
    payload: id
  };
};

const changeCourse = (id) => {
  return {
    type: 'CHANGE_COURSE',
    payload: id
  };
};

const deleteCourse = (id) => {
  return {
    type: 'DELETE_COURSE',
    payload: id
  };
};

export {
  toggleMenu,
  onInputChange,
  clearFields,
  saveChanging,
  changeCourse,
  deleteCourse
};