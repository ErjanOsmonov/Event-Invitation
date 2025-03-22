const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  };
  
  module.exports = errorHandler;