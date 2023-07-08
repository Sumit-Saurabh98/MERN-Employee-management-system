const initialState = {
    user: null,
    token: null,
    error: null,
    loading: false,
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_START':
      case 'LOGIN_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'SIGNUP_SUCCESS':
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated:true,
          loading: false,
          error: null,
        };
      case 'SIGNUP_FAILURE':
      case 'LOGIN_FAILURE':
        return {
          ...state,
          loading: false,
          isAuthenticated:false,
          error: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated:false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  