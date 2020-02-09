const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {type: String, required: true, max: 100},
    status: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);