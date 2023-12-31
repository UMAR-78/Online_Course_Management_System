import { server } from '../store';
import axios from 'axios';

export const courseRequest = (name, email, course) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'courseRequestRequest' });

    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      config
    );

    dispatch({ type: 'courseRequestSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'courseRequestFail',
      payload: error.response.data.message,
    });

    await axios.post(`${server}/log`, { functionName: "courseRequest", screen: "Course Request", details: error.message }, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      });
  }
};