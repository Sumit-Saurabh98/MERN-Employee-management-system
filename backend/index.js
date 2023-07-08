require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./configs/db');
const UserModel = require('./models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const employeeRoute = require('./controllers/employeeRoute');
const authMiddleware = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);

app.use('/employee', authMiddleware, employeeRoute);

app.listen(PORT, async () => {
  try {
    await connection();
    console.log(`Listening on ${PORT}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});
