const defaultData = { courses :[
  {id: 6, title: "Prerequisites", description: "Webpack, AngularCLI, TypeScript.", date: "2018-02-18", duration: "01:34", isMenuOpen: false, authors: 'LoftBlog'}, 
  {id: 5, title: "Components", description: "Components; lifecycle, template DSL and data-binding, Custom components.", date: "2018-02-01", duration: "01:34", isMenuOpen: false, authors: 'Epam'},
  {id: 4, title: "Directives + Pipes", description: "Directives, types of directives, built-in-directives, custom directive, pipes, custom pipes, async pipe...", date: "2018-01-15", duration: "01:34", isMenuOpen: false, authors: 'SoftServe'},
  {id: 3, title: "Modules & Services", description: "Services, DI, modules, lazy Loading.", date: "2017-12-28", duration: "01:34", isMenuOpen: false, authors: 'LoftBlog'}, 
  {id: 2, title: "Change detection", description: "Zone js, flow, Immuttutable data structure, push strategy.", date: "2017-11-29", duration: "01:34", isMenuOpen: false, authors: 'Epam'},
  {id: 1, title: "Routing", description: "Routing, Lazy and preloading, CanActivate, CanDeactivate.", date: "2017-10-03", duration: "01:34", isMenuOpen: false, authors: 'SoftServe'}
], nextId: 7};

const initialState = {
  courses: localStorage.getItem('courses') ? JSON.parse(localStorage.getItem('courses')) : defaultData.courses,
  nextId: Number(localStorage.getItem('nextId')) ? Number(localStorage.getItem('nextId')) : defaultData.nextId,
  searchingVal: '',
  title: '',
  description: '',
  duration: '',
  authors: '',
  date: '',
  changing: false,
  renderLink: false
};

const hideMenus = (courses) => {
  return courses.map(el => { el.isMenuOpen = false; return el });
};

const toggleMenu = (courses, id) => {
  const elem = courses.find(el => el.id === id);
  const newCourses = JSON.parse(JSON.stringify(courses));
  newCourses.map(el => { el.isMenuOpen = false; return el });
  if (!elem.isMenuOpen) {
    return newCourses.map(el => {
      if (el.id === id) {
        el.isMenuOpen = true;
      }
      return el;
    });
  }
  return newCourses;  
}

const createCourse = (title, description, duration, authors, date, id) => {
  return { id, title, description, date, duration, authors, isMenuOpen: false };
};

const getIndexFromId = (courses, id) => {
  return courses.findIndex(el => String(el.id) === String(id));
}

const isFieldsNotEmpty = (obj, target, value) => {
  obj[target] = value;
  return obj.title && obj.description && obj.date && obj.duration && obj.authors ? true : false;
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'COURSE_TOGLE_MENU':   
      return {
        ...state,
        courses: toggleMenu( state.courses, action.payload),
      };

    case 'ON_INPUT_CHANGE':
      return {
        ...state,
        [action.payload.target]:  action.payload.value,
        renderLink: isFieldsNotEmpty({ 
            title: state.title, description: state.description, 
            date: state.date, duration: state.duration, authors: state.authors
          }, action.payload.target, action.payload.value)
      };

    case 'SAVE_CHANGING':
      if (state.renderLink) {

        // Creating new course

        if (state.changing === false) {
          const newUpdatedList = [ createCourse(state.title, state.description, 
            state.duration, state.authors, state.date, state.nextId),
            ...state.courses
          ];
          localStorage.setItem('nextId', state.nextId + 1);
          localStorage.setItem('courses', JSON.stringify(newUpdatedList));
          return {
            ...state,
            courses: newUpdatedList,
            nextId: state.nextId + 1
          };
        } else {

          // Changing existing course
          
          const { title, description, duration, authors, date } = state;
          const idx = getIndexFromId(state.courses, action.payload);
          const newCourseslist = [ 
            ...state.courses.slice(0, idx), 
            createCourse(title, description, duration, authors, date, action.payload),
            ...state.courses.slice(idx + 1)
          ]
          localStorage.setItem('courses', JSON.stringify(newCourseslist));
          return {
            ...state,
            changing: false,
            courses: newCourseslist
          };
        }
      } else {

        // If the form is not filled

        return {
          ...state,
        }
      }
      
    case 'DELETE_COURSE':
      const index = getIndexFromId(state.courses, action.payload);
      const updatedCoursesList = [ 
        ...state.courses.slice(0, index), ...state.courses.slice(index + 1)
      ];
      localStorage.setItem('courses', JSON.stringify(updatedCoursesList)); 
      return {
        ...state,
        courses: updatedCoursesList
      };
        
    case 'CHANGE_COURSE':
      let editingCourse = state.courses.find(el => String(el.id) === String(action.payload));
      if (editingCourse === undefined) {
        editingCourse = { title: '', description: '', duration: '', authors: '', date: '' };       
      }
      const { title, description, duration, authors, date } = editingCourse;
      return {
        ...state,
        courses: [ ...hideMenus(state.courses)],
        title,
        description,
        duration,
        authors,
        date,
        changing: true,
        renderLink: false,
        searchingVal: ''
      };

    case 'CLEAR_INPUTS_FIELDS':
      return {
        ...state,
        courses: [ ...hideMenus(state.courses)],
        title: '',
        description: '',
        duration: '',
        authors: '',
        date: '',
        changing: false,
        renderLink: false,
        searchingVal: ''
      };

    default:
      return state;
  }
};

export default reducer;