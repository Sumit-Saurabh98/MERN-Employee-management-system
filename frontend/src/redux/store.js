// store.js

import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
    authReducer,
    employeeReducer,
  });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
