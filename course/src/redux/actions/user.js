import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const register = (name, email, password, role) => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, {name, email, password, role}, {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    });
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const buySubscription = (name, number, expiry, cvc) => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.post(`${server}/subscribe`, 
      { name, number, expiry, cvc },
      {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
    dispatch({ type: 'buySubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};

// export const cancelSubscription = () => async dispatch => {
//   try {
//     dispatch({ type: 'cancelSubscriptionRequest' });

//     const { data } = await axios.delete(`${server}/subscribe/cancel`, {
//       withCredentials: true,
//     });

//     dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: 'cancelSubscriptionFail',
//       payload: error.response.data.message,
//     });
//   }
// };