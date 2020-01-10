import { getCourseTerm, getCourseNumber, buttonColor, timeParts } from '../tools'
import { Button, Container, Title, Message } from 'rbx';
import React from 'react'; 
import hasConflict from './times'
import 'rbx/index.css'; 
import firebase from 'firebase/app';
import db from '../../App';


const Course = ({ course, state, user }) => (
    <Button color={ buttonColor(state.selected.includes(course)) }
      onClick={ () => state.toggle(course) }
      onDoubleClick={ user ? () => moveCourse(course) : null }
      disabled={ hasConflict(course, state.selected) }
      >
      { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
    </Button>
  );
  
  const moveCourse = course => {
      const meets = prompt('Enter new meeting data, in this format:', course.meets);
      if (!meets) return;
      const {days} = timeParts(meets);
      if (days) saveCourse(course, meets); 
      else moveCourse(course);
    };
  
  const saveCourse = (course, meets) => {
      db.child('courses').child(course.id).update({meets})
        .catch(error => alert(error));
    };
  
export default Course
