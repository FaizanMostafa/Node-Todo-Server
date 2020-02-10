const Task = require('../models/task');

exports.add = function(req, res) {
    let task = new Task(
        {
            name: req.body.name,
            status: req.body.status
        }
    );

    task.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Task added successfully')
    })
};


exports.all = function(req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            return next(err);
        }
        res.send({
            tasks: tasks
        })
    })
};


exports.get = function(req, res) {
    Task.find({_id: req.body.id}, function (err, task) {
        if (err) {
            return next(err);
        }
        res.send({
            task: task[0]
        })
    })
};


exports.update = function(req, res) {
    Task.updateOne({_id: req.body.id}, {$set: {
        name: req.body.name,
        status: req.body.status
    }}, function (err, task) {
        if (err) {
            return next(err);
        }
        res.send('Task updated successfully')
    })
};


exports.delete = function(req, res) {
    Task.deleteOne({_id: req.body.id}, function (err) {
        if (err) {
            return next(err);
        }
        res.send('Task deleted successfully')
    })
};