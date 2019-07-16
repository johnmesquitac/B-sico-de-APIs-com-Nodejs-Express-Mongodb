const jwt = require('jsonwebtoken');

const auth = (req, res, next)=>{
    const token_header = req.headers.auth;

    if(!token_header) return res.send({error: 'Authentication Denied!'});

    jwt.verify(token_header,'akira',(err,decoded)=>{
        if(err) return res.send({error: 'Invalid Token!'});
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;