const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = 'process.env.JWT_SECRET';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if(req.headers.authorization){
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    }
    catch {
      console.log('Invalid token');
    }
    return req;
  },
  // function for our unauthenticated routes
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
