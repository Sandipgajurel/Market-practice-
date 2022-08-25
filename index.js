const express = require('express');
const routes = require('./server');
const app = express();

const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(routes);

// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.listen(3001,() => console.log('Server is running on port 3001'));