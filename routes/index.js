var express = require('express');
var router = express.Router();

//数据库连接
var UserModel = require('../models/UserModel');

router.get('/', function(req, res) {
    // locals需要在render前面，方可生效。
    if(req.session.username){
  	  res.locals.isLogin = true;
    }else{
  	  res.locals.isLogin = false;
    }
    res.render('index', { title: 'Love Task' });
});

router.post('/login', function(req, res){
    UserModel.findOne({username: req.body.username})
        .exec(function(err, user){
            if(err) return console.log(err);

            if(!user){
                return res.json({response: 0, message: '不存在该账号'});
            }

            if(user.password == req.body.password){
                req.session.username = user.username;
                res.redirect('/');
            }else{
                return res.json({response: 0, message: '密码错误，请重新输入'});
            }
        })
});

//获取任务接口
router.get('/getTask', function(req, res){
    UserModel.findOne({username: req.session.username})
        .exec(function(err, user){
            if(err) return console.log(err);
            if(!user) return console.log('undefined!');
            res.json(user.task);
        })
});

//统一更改任务后的接口
router.post('/saveTask', function(req, res){
    UserModel.updateTask(req, res, req.body.task);
});

module.exports = router;
