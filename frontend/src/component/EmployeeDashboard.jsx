import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../redux/employeeAction';
import styles from '../styles/EmployeeDashboard.module.css';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const loading = useSelector((state) => state.employeeReducer.loading);
  const error = useSelector((state) => state.employeeReducer.error);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: '',
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddEmployee = () => {
    dispatch(addEmployee(newEmployee));
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      salary: '',
    });
  };

  const handleUpdateEmployee = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    const updatedEmployee = employees.find((employee) => employee._id === employeeId);
    if (updatedEmployee) {
      setNewEmployee({ ...updatedEmployee });
    }
  };

  const handleSaveUpdateEmployee = () => {
    if (selectedEmployeeId) {
      dispatch(updateEmployee(selectedEmployeeId, newEmployee));
      setSelectedEmployeeId(null);
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        salary: '',
      });
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Employee Dashboard</h2>
        <div className={styles.addEmployee}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newEmployee.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newEmployee.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={newEmployee.department}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={handleInputChange}
          />
          {selectedEmployeeId ? (
            <button onClick={handleSaveUpdateEmployee}>Save</button>
          ) : (
            <button onClick={handleAddEmployee}>Add Employee</button>
          )}
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td>
                  <button onClick={() => handleUpdateEmployee(employee._id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeDashboard;
