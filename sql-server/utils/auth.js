const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function (req, res, next) {
        // allows token to be sent via  req.query or headers
        // the value of "token" is dependent on if the query or headers exist
        let token = req.query.token || req.headers.authorization;
    
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
          //extracting the token from headers
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          //if token does not exist, send this message
          return res.status(400).json({ message: 'You have no token!' });
        }
    
        // verify token and get user data out of it
        try {
          // verifying that the token's secret and expiration match the secret and expiration provided by the code
          //extract the existing property from the token called data
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          // assigning data to a new property in the request called user
          //req.user is an object with "username" and "id" as keys
          req.user = data;
        } catch {
          console.log('Invalid token');
          return res.status(400).json({ message: 'invalid token!' });
        }
    
        // send to next endpoint
        next();
      },
      //you can store whatever you want in the signToken parameter, doesn't need to just be username and id
      //although "user" i spassed as the parameter for signToken in usercontrollers, here we are using object deconstruction to just get access to the username and id properties
      signToken: function ({ username, id }) {
        const payload = { username, id };
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      },
}