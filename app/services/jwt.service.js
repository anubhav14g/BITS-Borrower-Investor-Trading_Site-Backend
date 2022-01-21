const jwt = require('jsonwebtoken');
let secret = process.env.JWT_SECRET_KEY;

exports.encode = (data) => {
    return jwt.sign(data, secret)
};

exports.decode = (token) => {
    return decoded = jwt.verify(token, secret);
};