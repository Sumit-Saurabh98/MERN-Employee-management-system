import axios from 'axios';

// Action creators for fetching employees
const BASE_URL = 'http://localhost:8080';

export const fetchEmployeesStart = () => {
  return { type: 'FETCH_EMPLOYEES_START' };
};

export const fetchEmployeesSuccess = (employees) => {
  return { type: 'FETCH_EMPLOYEES_SUCCESS', payload: employees };
};

export const fetchEmployeesFailure = (error) => {
  return { type: 'FETCH_EMPLOYEES_FAILURE', payload: error };
};

const token = localStorage.getItem('token');

export const fetchEmployees = () => {
  return async (dispatch) => {
    dispatch(fetchEmployeesStart());
    try {
      const response = await axios.get(`${BASE_URL}/employee`,{
        headers:{
            "Authorization": token
        }
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
  return { type: 'ADD_EMPLOYEE_START' };
};

export const addEmployeeSuccess = (employee) => {
  return { type: 'ADD_EMPLOYEE_SUCCESS', payload: employee };
};

export const addEmployeeFailure = (error) => {
  return { type: 'ADD_EMPLOYEE_FAILURE', payload: error };
};

export const addEmployee = (employeeData) => {
  return async (dispatch) => {
    dispatch(addEmployeeStart());

    try {
      const response = await axios.post(`${BASE_URL}/employee/create`, employeeData);
      const newEmployee = response.data.employee;
      dispatch(addEmployeeSuccess(newEmployee));
    } catch (error) {
      dispatch(addEmployeeFailure(error.response.data.message));
    }
  };
};

// Action creators for updating an employee

export const updateEmployeeStart = () => {
  return { type: 'UPDATE_EMPLOYEE_START' };
};

export const updateEmployeeSuccess = (employee) => {
  return { type: 'UPDATE_EMPLOYEE_SUCCESS', payload: employee };
};

export const updateEmployeeFailure = (error) => {
  return { type: 'UPDATE_EMPLOYEE_FAILURE', payload: error };
};

export const updateEmployee = (employeeId, employeeData) => {
  return async (dispatch) => {
    dispatch(updateEmployeeStart());

    try {
      const response = await axios.put(`${BASE_URL}/employee/update/${employeeId}`, employeeData);
      const updatedEmployee = response.data.employee;
      dispatch(updateEmployeeSuccess(updatedEmployee));
    } catch (error) {
      dispatch(updateEmployeeFailure(error.response.data.message));
    }
  };
};

// Action creators for deleting an employee

export const deleteEmployeeStart = () => {
  return { type: 'DELETE_EMPLOYEE_START' };
};

export const deleteEmployeeSuccess = (employeeId) => {
  return { type: 'DELETE_EMPLOYEE_SUCCESS', payload: employeeId };
};

export const deleteEmployeeFailure = (error) => {
  return { type: 'DELETE_EMPLOYEE_FAILURE', payload: error };
};

export const deleteEmployee = (employeeId) => {
  return async (dispatch) => {
    dispatch(deleteEmployeeStart());

    try {
      const response = await axios.delete(`${BASE_URL}/employee/delete/${employeeId}`);
      const deletedEmployeeId = response.data.employee._id;
      dispatch(deleteEmployeeSuccess(deletedEmployeeId));
    } catch (error) {
      dispatch(deleteEmployeeFailure(error.response.data.message));
    }
  };
};



