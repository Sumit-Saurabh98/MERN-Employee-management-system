import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const signupStart = () => {
  return { type: 'SIGNUP_START' };
};

export const signupSuccess = (user, token) => {
  return { type: 'SIGNUP_SUCCESS', payload: { user, token } };
};

export const signupFailure = (error) => {
  return { type: 'SIGNUP_FAILURE', payload: error };
};

export const signup = (email, password, confirmPassword) => {
  return async (dispatch) => {
    dispatch(signupStart());

    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
        confirmPassword,
      });

      const { user, token } = response.data;
    //   console.log(response)
      dispatch(signupSuccess(user, token));
    } catch (error) {
      dispatch(signupFailure(error.response.data.message));
    }
  };
};

export const loginStart = () => {
  return { type: 'LOGIN_START' };
};

export const loginSuccess = (user, token) => {
  return { type: 'LOGIN_SUCCESS', payload: { user, token } };
};

export const loginFailure = (error) => {
  return { type: 'LOGIN_FAILURE', payload: error };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(user, token));
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};
