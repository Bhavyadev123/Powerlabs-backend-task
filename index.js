//import router from './routes/assignments'; const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your-secret-key';

// Initialize Sequelize
const sequelize = new Sequelize('postgres://user:password@localhost:5432/assignments_db');

// Define Models
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Assignment = sequelize.define('Assignment', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    due_date: {
        type: DataTypes.DATE,
    },
    total_score: {
        type: DataTypes.INTEGER,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    grade: {
        type: DataTypes.INTEGER,
    },
});

// Synchronize Models with DB
sequelize.sync();
