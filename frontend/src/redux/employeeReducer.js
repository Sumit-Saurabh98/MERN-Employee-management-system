import {
  FETCH_EMPLOYEES_START,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_START,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_START,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from './employeeAction';

const initialState = {
  employees: [],
  loading: false,
  error: null,
  pagination:{}
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_START:
    case ADD_EMPLOYEE_START:
    case UPDATE_EMPLOYEE_START:
    case DELETE_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        loading: false,
        error: null,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((employee) => employee._id !== action.payload),
        loading: false,
        error: null,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee
        ),
        loading: false,
        error: null,
      };
    case FETCH_EMPLOYEES_FAILURE:
    case ADD_EMPLOYEE_FAILURE:
    case UPDATE_EMPLOYEE_FAILURE:
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;