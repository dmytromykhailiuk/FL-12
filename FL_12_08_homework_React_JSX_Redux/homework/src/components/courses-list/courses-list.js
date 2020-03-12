import React from 'react';
import CourseListItem from '../course-list-item';
import { connect } from 'react-redux';
import { toggleMenu, deleteCourse } from '../../actions';

const CoursesList = ({ courses, searchingVal, toggleMenu, deleteCourse }) => {

  return (
    <ul className="book-list" >
      {
        courses.filter(el => { 
            return `${el.date} ${el.title} ${el.description} ${el.duration} ${el.authors}`
              .toUpperCase().indexOf(searchingVal.toUpperCase()) > -1 }
          ).map(course => {
            return (
              <CourseListItem
                key={course.id}
                course={course}
                toggleMenu={() => toggleMenu(course.id)}
                deleteCourse={deleteCourse} />
          );
        })
      }
    </ul>
  );
}

const mapStateToProps = ({ courses, searchingVal }) => {
  return { courses, searchingVal };
};

const mapDispatchToProps = {
  toggleMenu, deleteCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);