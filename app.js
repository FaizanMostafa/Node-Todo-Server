require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./routes/task');
const port = 3000;


const app = express();

// Setting static files directory for serving static files
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// App Routes
app.use('/tasks', tasks);
app.get('/', (req, resp) => {
  resp.send("Hello World");
})


app.listen(port, ()=>console.log(`Server is up and running at localhost:${port}`))