import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../redux/employeeAction';
import styles from '../styles/EmployeeDashboard.module.css';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employeeReducer.employees);
  const loading = useSelector((state) => state.employeeReducer.loading);
  const error = useSelector((state) => state.employeeReducer.error);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className={styles.container}>
     <div>
     <h2>Employee Dashboard</h2>
      <button>Add Employee +</button>
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
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.salary}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeDashboard;
