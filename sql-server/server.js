const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path')

//define PORT
const PORT = 3001;

//define middleware
app.use(express.json());  //means everything coming into or going out of server needs to be in json format
app.use(express.urlencoded({ extended: true }));  //used to access the req.body
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
};

app.listen(PORT, () => {
    console.log('server is running on port 3001');
});
