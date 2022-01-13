const express = require('express');
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.authenticate, todoController.createTodo);
router.delete('/:id', authController.authenticate, todoController.deleteTodo);
router.put('/:id', authController.authenticate, todoController.updateTodo);

module.exports = router;
