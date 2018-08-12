import axios from 'axios'

import { baseUrl } from './util'

export default axios.create({ baseURL: baseUrl })

export const fetchCourses = async () => {
  const res = await axios.get('/api/courses')
  return res.data
}