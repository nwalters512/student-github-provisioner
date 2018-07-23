import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import config from '../config';

import CourseList from '../components/course-list'

const SelectCourse = ({ onCourseSelected }) => (
  <Card>
    <CardContent>
      <Typography variant="display1" gutterBottom>
        Hey there!
      </Typography>
      <Typography>
        This tool will help you create a GitHub repository for your course.
        To get started, please select your course from the list below.
      </Typography>
    </CardContent>
    <CourseList courses={config.courses} onCourseSelected={onCourseSelected} />
  </Card>
)

SelectCourse.propTypes = {
  onCourseSelected: PropTypes.func.isRequired,
}

export default SelectCourse;