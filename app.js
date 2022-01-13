// const { sequelize } = require('./models/index');
// sequelize.sync();

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/todoRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/todos', todoRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    if (err.name === 'JsonWebTokenError') {
        code = 401;
    }
    if (err.name === 'TokenExpiredError') {
        code = 401;
    }
    if (process.env.NODE_ENV === 'development') {
        res.status(code).json({ message: err.message });
    } else {
        res.status(code.json({ message: 'something wrong' }));
    }
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server running on port ${port}`));
