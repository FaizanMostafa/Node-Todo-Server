// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://<username>:<password>@cluster0-qbjyw.mongodb.net/node_todo?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));