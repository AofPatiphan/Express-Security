const jwt = require('jsonwebtoken');
const { Todo } = require('../models/index');

exports.getAllTodo = async (req, res, next) => {
    try {
        const todos = await Todo.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ todos });
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
        res.status(200).json({ todo });
    } catch (err) {
        next(err);
    }
};

exports.createTodo = async (req, res, next) => {
    try {
        const { title, completed } = req.body;

        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization || !authorization.startsWith('Bearer')) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'you are unauthenticated' });
        }

        const payload = jwt.verify(token, 'abcdefgh');
        const todo = await Todo.create({
            title,
            completed,
            userId: payload.id,
        });
        res.status(201).json({ todo });
    } catch (err) {
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const { title, completed } = req.body;
        const { id } = req.params;

        const [affectedRow] = await Todo.update(
            {
                title,
                completed,
            },
            {
                where: {
                    id,
                    userId: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update todo' });
        }

        const todo = await Todo.findOne({ where: { id } });

        res.status(200).json({ todo });
    } catch (err) {
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [affectedRow] = await Todo.destroy({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot delete todo' });
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
