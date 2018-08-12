import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const CourseList = ({ courses, onCourseSelected }) => (
  <List>
    {courses.map(course => (
      <ListItem
      button
      key={course.id}
      onClick={() => onCourseSelected(course.id)}
      >
        <ListItemText primary={course.shortname} secondary={course.name} />
      </ListItem>
    ))}
  </List>
)

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    shortname: PropTypes.string
  })),
  onCourseSelected: PropTypes.func.isRequired,
}

CourseList.defaultProps = {
  courses: [],
}

export default CourseList