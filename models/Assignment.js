const express = require('express');
const Assignment = require('../models/Assignment');
const authenticateJWT = require('../middleware/authenticate');

const router = express.Router();

// Create Assignment
router.post('/', authenticateJWT, async (req, res) => {
    const { title, description, due_date, total_score, student_id } = req.body;
    
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Only teachers can create assignments' });
    }

    const assignment = await Assignment.create({ 
        title, 
        description, 
        due_date, 
        total_score, 
        created_by: req.user.id, 
        student_id 
    });

    res.json(assignment);
});

// Get All Assignments
router.get('/', authenticateJWT, async (req, res) => {
    const assignments = await Assignment.findAll({
        where: req.user.role === 'teacher' ? { created_by: req.user.id } : { student_id: req.user.id }
    });

    res.json(assignments);
});

// Update Assignment
router.put('/:id', authenticateJWT, async (req, res) => {
    const assignment = await Assignment.findOne({ where: { id: req.params.id, created_by: req.user.id } });

    if (!assignment) {
        return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    await assignment.update(req.body);
    res.json(assignment);
});

// Delete Assignment
router.delete('/:id', authenticateJWT, async (req, res) => {
    const assignment = await Assignment.findOne({ where: { id: req.params.id, created_by: req.user.id } });

    if (!assignment) {
        return res.status(403).json({ message: 'Not authorized to delete this assignment' });
    }

    await assignment.destroy();
    res.json({ message: 'Assignment deleted' });
});

module.exports = router;
