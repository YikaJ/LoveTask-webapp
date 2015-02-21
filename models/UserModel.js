var mongoose = require('../models/mongodb').mongoose;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    task: [DefaultArray]
});

var DefaultArray = new Schema({
    type: {type: Number, required: true},
    loverType: {type: Number, required: true},
    loverName: {type: Number, required: true},
    taskList: [TaskSchema]
});

var TaskSchema = new Schema({
    limitTime: Date,
    content: {type: String, required: true},
    punishment: {type: String, required: true},
    status: {type: Number, required: true}
});

var UserModel = mongoose.model('user', UserSchema);

UserModel.updateTask = function(req, res, task){
    UserModel.findOne({username: req.session.username})
        .exec(function(err, user){
            if(err) return console.log(err);
            var userId = user._id;
            UserModel.findByIdAndUpdate(userId, {$set:{task: task}})
                .exec(function(err){
                    if(err){
                        res.json({
                            response: 0,
                            message: err
                        });
                        return console.log(err);
                    }
                    res.json({
                        response: 1,
                        message: '数据修改成功'
                    });
                });
        })
};

module.exports = UserModel;