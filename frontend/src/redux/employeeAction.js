import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Action types
export const FETCH_EMPLOYEES_START = 'FETCH_EMPLOYEES_START';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

export const ADD_EMPLOYEE_START = 'ADD_EMPLOYEE_START';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_EMPLOYEE_FAILURE = 'ADD_EMPLOYEE_FAILURE';

export const UPDATE_EMPLOYEE_START = 'UPDATE_EMPLOYEE_START';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';

export const DELETE_EMPLOYEE_START = 'DELETE_EMPLOYEE_START';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';

// Action creators for fetching employees
export const fetchEmployeesStart = () => {
  return { type: FETCH_EMPLOYEES_START };
};

export const fetchEmployeesSuccess = (employees) => {
  return { type: FETCH_EMPLOYEES_SUCCESS, payload: employees };
};

export const fetchEmployeesFailure = (error) => {
  return { type: FETCH_EMPLOYEES_FAILURE, payload: error };
};

// Fetch employees with pagination, sorting, and filtering
export const fetchEmployees = (department, order, search, page, item) => {
  return async (dispatch) => {
    dispatch(fetchEmployeesStart());

    try {
      const token = localStorage.getItem('token');

      const params = {};

      if (department) {
        params.department = department;
      }
      if (order) {
        params.sort = 'salary';
        params.order = order;
      }
      if (search) {
        params.search = search;
      }
      if (page) {
        params.page = page;
      }
      if (item) {
        params.item = item;
      }

      const response = await axios.get(`${BASE_URL}/employee`, {
        params,
        headers: { Authorization: token },
      });

      const employees = response.data.employees;
      dispatch(fetchEmployeesSuccess(employees));
    } catch (error) {
      dispatch(fetchEmployeesFailure(error.response.data.message));
    }
  };
};






// Action creators for adding an employee
export const addEmployeeStart = () => {
  return { type: ADD_EMPLOYEE_START };
};

export const addEmployeeSuccess = (employee) => {
  return { type: ADD_EMPLOYEE_SUCCESS, payload: employee };
};

export const addEmployeeFailure = (error) => {
  return { type: ADD_EMPLOYEE_FAILURE, payload: error };
};

export const addEmployee = (employeeData) => {
  return async (dispatch) => {
    dispatch(addEmployeeStart());

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(`${BASE_URL}/employee/create`, employeeData, {
        headers: { Authorization: token },
      });

      const newEmployee = response.data.employee;
      dispatch(addEmployeeSuccess(newEmployee));
    } catch (error) {
      dispatch(addEmployeeFailure(error.response.data.message));
    }
  };
};

// Action creators for updating an employee
export const updateEmployeeStart = () => {
  return { type: UPDATE_EMPLOYEE_START };
};

export const updateEmployeeSuccess = (employee) => {
  return { type: UPDATE_EMPLOYEE_SUCCESS, payload: employee };
};

export const updateEmployeeFailure = (error) => {
  return { type: UPDATE_EMPLOYEE_FAILURE, payload: error };
};

export const updateEmployee = (employeeId, employeeData) => {
  return async (dispatch) => {
    dispatch(updateEmployeeStart());

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        `${BASE_URL}/employee/update/${employeeId}`,
        employeeData,
        {
          headers: { Authorization: token },
        }
      );

      const updatedEmployee = response.data.employee;
      dispatch(updateEmployeeSuccess(updatedEmployee));
    } catch (error) {
      dispatch(updateEmployeeFailure(error.response.data.message));
    }
  };
};

// Action creators for deleting an employee
export const deleteEmployeeStart = () => {
  return { type: DELETE_EMPLOYEE_START };
};

export const deleteEmployeeSuccess = (employeeId) => {
  return { type: DELETE_EMPLOYEE_SUCCESS, payload: employeeId };
};

export const deleteEmployeeFailure = (error) => {
  return { type: DELETE_EMPLOYEE_FAILURE, payload: error };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(deleteEmployeeStart());

    try {
      const token = localStorage.getItem('token');

      await axios.delete(`${BASE_URL}/employee/delete/${employeeId}`, {
        headers: { Authorization: token },
      });

      dispatch(deleteEmployeeSuccess(employeeId));
    } catch (error) {
      dispatch(deleteEmployeeFailure(error.response.data.message));
    }
  };
};
