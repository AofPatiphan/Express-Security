// const bcrypt = require('bcryptjs');

// const message = '1234567';

// const run = async () => {
//     const hashed = await bcrypt.hash(message, 10);
//     console.log(hashed);
// };

// const test = async () => {
//     const isMatch = await bcrypt.compare(
//         message,
//         '$2a$10$.GYo7q.TCnxeQ.qe9rO5K.mqN3tyZTEYkn4SAWMmMkSZxtofQcnFm'
//     );
//     console.log(isMatch);
// };

// run();
// test();

// json webtoken
// create
const jwt = require('jsonwebtoken');

const payload = {
    message: 'Hello my friend.',
};

const secretKey = 'codecamp';

const token = jwt.sign(payload, secretKey, {
    expiresIn: 60,
});

console.log(token);

// verify
const tokenToVeryfy =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGVsbG8gbXkgZnJpZW5kLiIsImlhdCI6MTY0MjA0MjkyOCwiZXhwIjoxNjQyMDQyOTg4fQ.TetrjczYIlwjxebBpEou2_qBMH_W-TvOEOPMLGISDKE';
try {
    const decoded = jwt.verify(tokenToVeryfy, secretKey);
    console.log(decoded);
} catch (err) {
    console.log(err);
}
