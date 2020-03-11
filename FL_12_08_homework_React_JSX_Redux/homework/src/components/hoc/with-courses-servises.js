import React from 'react';
import { CoursesService } from '../bookstore-service-context';

const withCoursesService = () => (Wrapped) => {

  return (props) => {
    return (
      <CoursesService>
        {
          (coursesService) => {
            return (<Wrapped {...props}
              coursesService={coursesService}/>);
          }
        }
      </CoursesService>
    );
  }
};

export default withCoursesService;