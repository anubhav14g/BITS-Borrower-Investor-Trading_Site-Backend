const jwtService = require('../services/jwt.service');

function verify(req, res, next) {
    let token = req.header(process.env.TOKEN_HEADER_KEY);
    if(token) {
        // verify token
        try {
            req.decoded_token = jwtService.decode(token);
            next();
        }
        catch(err) {
            console.log(err);
            return res.status(200).json({ status : false, message  : 'Access Denied, Token invalid' })
        }
    } else {
        return res.status(200).json({ status : false, message : 'No token provided' });
    }
}

module.exports = {verify}