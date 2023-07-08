const express = require('express');
const EmployeeModel = require('../models/employeeModel');
const router = express.Router();

// Get employees with filter, sort, search, and pagination
router.get('/', async (req, res) => {
  try {
    const { department, sort, order, search, page, item } = req.query;

    const filters = {};
    if (department) {
      filters.department = department;
    }

    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1;
    }

    const searchQuery = search ? { $text: { $search: search } } : {};

    const startIndex = (page - 1) * item;
    const endIndex = page * item;

    const totalEmployees = await EmployeeModel.countDocuments(filters);
    const totalPages = Math.ceil(totalEmployees / item);

    const employees = await EmployeeModel.find({ ...filters, ...searchQuery })
      .sort(sortOptions)
      .skip(startIndex)
      .limit(item);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalEmployees: totalEmployees,
    };

    res.status(200).json({ employees, pagination });
  } catch (error) {
    console.log('Fetch employees error', error);
    res.status(500).json({ message: 'Internal Server Error during getting employees' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const newEmployee = await EmployeeModel.create({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    res.status(201).json({ message: 'Employee added', employee: newEmployee });
  } catch (error) {
    console.log('Employee addition error', error);
    res.status(500).json({ message: 'Internal server error during adding' });
  }
});

router.put('/update/:employeeId', async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;
    const employeeId = req.params.employeeId;

    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: employeeId },
      { firstName, lastName, email, department, salary },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee details updated', employee: updatedEmployee });
  } catch (error) {
    console.log('Updated employee error', error);
    res.status(500).json({ message: 'Internal server error during update' });
  }
});

router.delete('/delete/:employeeId', async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const deletedEmployee = await EmployeeModel.findOneAndDelete({ _id: employeeId });
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not deleted' });
    }

    res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    console.log('Deleted employee error', error);
    res.status(500).json({ message: 'Internal server error during delete' });
  }
});

module.exports = router;
