import { getCourseTerm, buttonColor } from './tools'
import 'rbx/index.css';
import Course from './Course/Course';
import { Button, Container, Title, Message } from 'rbx';
import React, { useState } from 'react';

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const TermSelector = ({ state }) => (
    <Button.Group hasAddons>
    { Object.values(terms)
        .map(value => 
          <Button key={value}
            color={ buttonColor(value === state.term) }
            onClick={ () => state.setTerm(value) }
            >
            { value }
          </Button>
        )
    }
    </Button.Group>
  );
  
  
  
  const useSelection = () => {
    const [selected, setSelected] = React.useState([]);
    const toggle = (x) => {
      setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
    };
    return [ selected, toggle ];
  };

  const CourseList = ({ courses, user }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, toggle] = useSelection();
    const termCourses = courses.filter(course => term === getCourseTerm(course));
   
    return (
      <React.Fragment>
        <TermSelector state={ { term, setTerm } } />
        <Button.Group>
          { termCourses.map(course =>
             <Course key={ course.id } course={ course }
               state={ { selected, toggle } }
               user={ user } />) }
        </Button.Group>
      </React.Fragment>
    );
  };

  export default CourseList; 

  